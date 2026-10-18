---
title: "GitVersionCore"
summary: ""
screenshot: ""
hidden: false
github:
  id: 245266678
  repository: "kodybrown/GitVersionCore"
  url: "https://github.com/kodybrown/GitVersionCore"
  description: "Helpful MSBuild task for versioning your .NET Core projects"
  pushedAt: "2020-03-05T21:10:25Z"
  language: "C#"
  archived: false
  readmeUrl: "https://github.com/kodybrown/GitVersionCore/blob/master/README.md"
  readmeDownloadUrl: "https://raw.githubusercontent.com/kodybrown/GitVersionCore/master/README.md"
---


Helpful MSBuild task for versioning your .NET Core projects.

I hope to add this as a NuGet package, soon.

## Using it

In your .csproj file, add the following:

```xml
<UsingTask TaskName="GitVersionCore" AssemblyFile="<path>/GitVersionCore.dll" />
<Target Name="AfterGenerateAssemblyInfo" AfterTargets="CoreGenerateAssemblyInfo">
    <GitVersionCore OutputFile="$(GeneratedAssemblyInfoFile)" Copyright="Copyright (C) 2017-{Year}" />
</Target>
```

## Contributing

Sure, send me a PR.
