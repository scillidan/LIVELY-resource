# LIVELY-resource

[![](https://img.shields.io/static/v1?style=for-the-badge&message=atom&color=222222&logo=RSS&logoColor=FFA500&label=)](https://github.com/scillidan/LIVELY-resource/commits/main.atom)

Resources of [lively](https://github.com/rocksdanister/lively) and [Wallpaper Engine](https://www.wallpaperengine.io/).  
I collect them occasionally. I have made some minor changes in some resources, mainly for offline use (no google-tag, etc...), colors, etc.  
See [table.md](table.md) to get preview, source, author, license, notes.  
See [resource.md](resource.md) to get download links.

## Tools

- [Sublime Text](https://www.sublimetext.com)
- [JsPrettier](https://github.com/jonlabelle/SublimeJsPrettier)
- [miniserve](https://github.com/svenstaro/miniserve)
- [HTTrack](https://www.httrack.com/)
- ...

## Witchcraft 🧙

```cmd
curlie -k https://raw.githubusercontent.com/scillidan/LIVELY-resource/main/resource.md ^
  | sd "\[\D+\]\(" "" ^
  | sd "(\)\|\[)" "|[" ^
  | sd "\[\d{10}\]\(" "" ^
  | sd "(\)\|!\S+subsc)" "|![](//img.shields.io/steam/subsc" ^
  | mdtable2csv ^
  | sd "//gi" "https://gi" ^
  | sd "//steamc" "https://steamc" ^
  | xsv select source,lively,wallpapeng ^
  | csview
```

![](/LIVELY-resource.png)