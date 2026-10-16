---
title: "encrypt / decrypt (week #18)"
date: "2013-04-30"
summary: "Simple utility that will copy newer and/or missing files from the source folder to the destination folder. Please note that openssl is required! These two batch files just wrap it. Check out the source code on GitHub!"
topics: ["Application of the Week 2013","CLI"]
originalUrl: "https://elegantdevelopment.blogspot.com/2013/04/app-of-week-18-encryptbat-decryptbat.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-3758473314530250914"
---

Simple utility that will copy newer and/or missing files from the source folder to the destination folder.

Please note that **`openssl`** is required! These two batch files just wrap it.

Check out the source code on [**GitHub**](https://github.com/kodybrown/dos)!

```text
> encrypt /?
                                            o
                                            8
  .oPYo. odYo. .oPYo. oPYo. o    o .oPYo.  o8P
  8oooo8 8' '8 8    ' 8  '' 8    8 8    8   8
  8.     8   8 8    . 8     8    8 8    8   8
  'Yooo' 8   8 'YooP' 8     'YooP8 8YooP'   8
:::.....:..::..:.....:..:::::....8 8 ....:::..:::
::::::::::::::::::::::::::::::ooP'.8 ::::::::::::
::::::::::::::::::::::::::::::...::..::::::::::::

  simple wrapper using openssl to encrypt files
      batch file created by wasatchwizard

  USAGE:

  $ encrypt file

    Performs in-place encryption of 'file'.
    WARNING: This overwrites existing file!

  $ encrypt infile outfile

    Encrypts 'infile' and saves to 'outfile'.


> decrypt /?

       8                                     o
       8                                     8
  .oPYo8 .oPYo. .oPYo. oPYo. o    o .oPYo.  o8P
  8    8 8oooo8 8    ' 8  '' 8    8 8    8   8
  8    8 8.     8    . 8     8    8 8    8   8
  'YooP' 'Yooo' 'YooP' 8     'YooP8 8YooP'   8
:::.....::.....::.....:..:::::....8 8 ....:::..:::
:::::::::::::::::::::::::::::::ooP'.8 ::::::::::::
:::::::::::::::::::::::::::::::...::..::::::::::::

  simple wrapper using openssl to decrypt files
       batch file created by wasatchwizard

  USAGE:

  $ decrypt file

    Performs in-place decryption of 'file'.
    WARNING: This overwrites existing file!

  $ decrypt infile outfile

    Decrypts 'infile' and saves to 'outfile'.
```
