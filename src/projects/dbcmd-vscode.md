---
title: "dbcmd-vscode"
summary: ""
screenshot: ""
hidden: false
github:
  id: 1409331720
  repository: "kodybrown/dbcmd-vscode"
  url: "https://github.com/kodybrown/dbcmd-vscode"
  description: "A Visual Studio Code desktop extension for preparing and running SQL against PostgreSQL and Microsoft SQL Server. dbcmd supports comment-based configuration, variables, file imports, and results as text tables, CSV, JSON, XML, or ASCII charts."
  pushedAt: "2026-10-07T20:18:45Z"
  language: "TypeScript"
  archived: false
  readmeUrl: "https://github.com/kodybrown/dbcmd-vscode/blob/main/README.md"
  readmeDownloadUrl: "https://raw.githubusercontent.com/kodybrown/dbcmd-vscode/main/README.md"
---


A Visual Studio Code desktop extension for preparing and running SQL against PostgreSQL and Microsoft SQL Server. dbcmd supports comment-based configuration, variables, file imports, and results as text tables, CSV, JSON, XML, or ASCII charts.

This is a work in progress. Read the [current limitations](#current-limitations) before using it with important data. The [public-release review](docs/PUBLIC_RELEASE_REVIEW.md) records the release gates.

## Requirements

- VS Code desktop. The manifest declares VS Code `^1.52.0`; that minimum version has not been verified in this review.
- An accessible PostgreSQL or SQL Server database and an account with the permissions your queries need.
- Node.js and npm if building from source.

Queries run with the configured account's permissions. dbcmd does not enforce read-only SQL or prompt before executing statements that change data. Use an account with only the permissions you need.

## Getting started

1. Install an inspected VSIX using **Extensions: Install from VSIX...** in the Command Palette, or launch a development instance using the instructions below.
2. Open **Preferences: Open User Settings (JSON)** and add a named connection. Keep credentials out of repository settings and SQL files.

   ```json
   {
     "dbcmd.databases": {
       "demo": "postgres://demo:${env:DBCMD_PASSWORD}@localhost:5432/demo"
     }
   }
   ```

   This example is for a local PostgreSQL database. `DBCMD_PASSWORD` must be available to the VS Code extension host. Start VS Code from a shell that has the variable, restarting the application if necessary. URI-encode credentials containing reserved URL characters before substitution. Read the credential and TLS limitations below before using remote databases.

   A named SQL Server connection uses `mssql://`:

   ```json
   {
     "dbcmd.databases": {
       "demo_sqlserver": "mssql://demo:${env:DBCMD_PASSWORD}@localhost:1433/demo"
     }
   }
   ```

3. Save a SQL file containing:

   ```sql
   -- database = demo
   -- outputToFile = false
   SELECT 'Hello from dbcmd' AS greeting;
   ```

4. Run **dbcmd: Generate SQL** to inspect the expanded statement in the `dbcmd` Output channel. Generation requires a resolvable named connection but does not connect to the database. It can write files when file output is enabled.
5. After checking the complete generated statement, run **dbcmd: Execute SQL**.

Use a small, reviewed file for execution. The first-line selection bug can include statements outside the selection; see [current limitations](#current-limitations).

## Commands

| Command Palette title | Command ID | Behavior |
| --- | --- | --- |
| dbcmd: Execute SQL | `dbcmd.execute_sql` | Parse the document/selection, execute the generated SQL, and display results. |
| dbcmd: Generate SQL | `dbcmd.generate_sql` | Replace the Output channel contents with generated SQL. |
| dbcmd: Append Generated SQL | `dbcmd.generate_sql_append` | Append generated SQL to the Output channel. |

With no selection, the entire active document is processed. Configuration comments before a selection are also processed. Selection handling has known edge cases, so check generated SQL before execution.

## Configuration in SQL comments

Comment directives configure the connection and output without becoming part of the generated SQL:

```sql
-- database = demo
-- format = text
-- maxResults = 100
-- showSqlStatementInOutput = true
-- outputToFile = false
SELECT 1 AS example;
```

Use saved connection names through `dbcmd.databases`. The current code does not reliably support separate `host`, `user`, `password`, and `database` directives as an alternative.

Saved aliases can also use a `${dbname}` suffix for a family of databases:

```json
{
  "dbcmd.databases": {
    "demo_${dbname}": "postgres://demo:${env:DBCMD_PASSWORD}@localhost:5432/${dbname}"
  }
}
```

With that setting, `-- database = demo_reports` uses `reports` as the database name. This is connection-name substitution, not a SQL parameter.

`maxResults` and `maxResultsInFile` limit displayed or exported rows. They do not limit the query or stop the driver retrieving the full result. Add `LIMIT`, `TOP`, or another database-appropriate restriction when needed.

### Variables

Variables are textual substitutions, not bound SQL parameters. They can replace identifiers or values; quotes around a value remain part of that value.

```sql
-- database = demo
-- variable: "${column}" = greeting
-- variable: "${message}" = 'Hello from dbcmd'
SELECT ${message} AS ${column};
```

Generated SQL:

```sql
SELECT 'Hello from dbcmd' AS greeting;
```

Names can use syntax such as `$name`, `@name`, or `${name}`. Quotes around names are optional. Replacement is case-insensitive and follows assignment order, so bracketed names help avoid overlap between `$table` and `$table_name`. Variables may refer to previously defined variables and be reassigned later.

Do not substitute untrusted input into SQL. Self-references and cyclic variable definitions can hang the extension host.

### File imports

Import shared SQL or variable declarations:

```sql
-- importFile("shared_variables.sql")
```

Relative `importFile()` paths resolve against the active file's directory, with a workspace-folder fallback. Imported content is parsed as part of the document.

Read a file into a variable:

```sql
-- variable: "${values}" = fromFile("C:/path/to/demo-values.txt")
```

`fromFile()` trims contents and joins lines with commas. Unlike `importFile()`, it reads the supplied path directly; use an absolute path to avoid depending on the extension host's working directory.

Only process files you trust. Imports and variable expansion can read local files and environment variables; output directives can write to arbitrary accessible paths.

### Output formats and files

Supported formats are `text`, `csv`, `json`, `xml`, and `chart`. Set the format in the SQL file:

```sql
-- database = demo
-- format = csv
-- csv.minimalOutput = true
-- outputFileName = demo-results-${TIMESTAMP}.csv
-- outputToFile = true
SELECT 1 AS example;
```

Setting `outputFileName` itself enables file output. Place `-- outputToFile = false` after it to disable writing. Execute SQL and Generate SQL can overwrite existing output files; never target the input SQL file or another important file.

| Filename option | Behavior |
| --- | --- |
| No filename configured | Append the format extension to the active filename, for example `query.sql.txt`. |
| `-- outputFileName = *` | Append a timestamp and format extension, for example `query.sql.20261005_120000.csv`. |
| Relative filename | Resolve against the active file's directory, with a workspace-folder fallback. |
| Absolute filename | Write to that accessible path. |
| `${INC}` in the filename | Choose the next filename that does not already exist. |

Filenames support user variables, environment variables such as `${env:USERPROFILE}`, date/time variables such as `${TIMESTAMP}` and `${DATE-}`, and file variables such as `${file.NameOnly}`. The formatter extension is available as `${core.format_ext}`.

Chart output uses numeric columns named `a` (or `x`), `b`, and `c`:

```sql
-- database = demo
-- format = chart
SELECT 1 AS a UNION ALL SELECT 2 AS a UNION ALL SELECT 3 AS a;
```

CSV, JSON, and XML have escaping and value-conversion limitations. Validate exports before importing them into another system.

## VS Code settings

Search Settings for `dbcmd` or edit User Settings JSON. The full contributed list is in [package.json](package.json).

| Setting | Declared default | Purpose |
| --- | --- | --- |
| `dbcmd.databases` | `{}` | Named connection strings. |
| `dbcmd.core.maxResults` | `1000` | Maximum rows displayed. |
| `dbcmd.core.maxResultsInFile` | `10000` | Maximum rows exported. |
| `dbcmd.core.outputToFile` | `false` | Enable file output. |
| `dbcmd.core.outputFileName` | `""` | Configure the output filename. |
| `dbcmd.core.showSqlStatementInOutput` | `false` | Include generated SQL with results. |
| `dbcmd.core.showConnectionStringInOutput` | `false` | Include the full connection string, including credentials. |

Several settings use `value || default` internally, replacing explicit `false` or `0` with the fallback. Some declared defaults differ from runtime behavior. Prefer explicit SQL directives for output behavior and verify the result.

## Current limitations

- Selecting only the first line can process the entire document. Leading whitespace and multiline selections also need regression coverage.
- A missing connection environment variable logs the connection string, potentially including already expanded credentials, even when `showConnectionStringInOutput` is false. Do not share unsanitized logs or generated output.
- SQL Server always trusts the server certificate. PostgreSQL SSL object options are replaced with options disabling certificate verification. Verified remote TLS needs a code change.
- File output can overwrite existing files, including during Generate SQL. File imports and output paths are not confined to the workspace.
- Text replacement is not parameterized SQL. Recursive imports and cyclic variables have no cycle guard.
- CSV does not fully escape quotes/newlines, JSON does not fully escape strings, and XML does not escape markup. Zero/false values have formatting issues; chart output omits zero values.
- Locked dependencies have reported advisories. The automated extension test is only a template test; database execution and cross-platform behavior need meaningful acceptance coverage.

See [docs/PUBLIC_RELEASE_REVIEW.md](docs/PUBLIC_RELEASE_REVIEW.md) for evidence and release gates.

## Building and running from source

```powershell
git clone https://github.com/kodybrown/dbcmd-vscode.git
cd dbcmd-vscode
npm ci --ignore-scripts
npm run compile
npm run lint
code --new-window --extensionDevelopmentPath "$PWD" .
```

The last command opens a development instance of VS Code. Open a reviewed SQL file there and use the dbcmd commands from the Command Palette.

Compilation and lint were verified on Windows with Node.js `24.14.0` and npm `11.9.0`. Installation reports an engine warning for the old `@azure/msal-node` dependency; this does not establish supported runtime compatibility.

`npm test` compiles, lints, downloads VS Code, and launches the extension test runner. Its current test only checks an array operation; passing it would not verify query execution or the safety issues above.

On Windows, adding `.PS1` to `PATHEXT` can make npm's child processes launch PowerShell shims without forwarding arguments. If that applies to your environment, temporarily omit `.PS1` from `PATHEXT` while running npm build/package commands, then restore the original value.

After resolving the release gates, build a VSIX locally with:

```powershell
npx --yes @vscode/vsce@4.0.0 package --out "$env:TEMP\dbcmd.vsix"
```

Inspect the archive before distribution. Packaging uses `.vscodeignore` to exclude development material and local data. Git ignore rules alone do not establish what enters a VSIX. See the official [VS Code packaging documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## License

Released under the [MIT License](LICENSE.md).
