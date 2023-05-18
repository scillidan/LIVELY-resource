# LIVELY-resource

![](_media/stipple_cats.gif)

resources of [lively](https://github.com/rocksdanister/lively) and [Wallpaper Engine](https://www.wallpaperengine.io/).  
I collect them occasionally. I have made some minor changes in some resources, mainly for offline use (no CDN), colors, etc.  
See [metadata.md](metadata.md) to get more information about the source, author and license etc. **It's important.**  
See [data.md](data.md) to see download links and other data.

## Witchcraft 🧙

```cmd
curlie -k https://raw.githubusercontent.com/scillidan/LIVELY-resource/main/data.md ^
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

![](_media/LIVELY-resource.png)

## Todo

- [x] add local files of web-wallpaper to this repo, declare `fork`` relationship
- [x] add `.csv` that containing metadata
- [x] add preview-picture
- [x] upload to https://steamcommunity.com/workshop/
- [ ] how download single, [gh-download](https://github.com/yuler/gh-download) or ..
- [ ] see https://docs.wallpaperengine.io/en/web/overview.html?
- [ ] how automatically track repo's upstream updates?
- [ ] make some adjustments on muser, about window and mouse. change the source of the audio file

## Note

1. fork a repository as submodule
2. goto local repository
3. git submodule add .url