#!/bin/bash
cd "$(dirname "$0")"

set -- `getopt "hrsut" "$@"`
while :; do
  case "$1" in
    -h) help="true" ;;
    -s) split="true" ;;
    -r) recolor="true" ;;
    -u) ui="true";;
    -t) tiled="true";;
    --) break ;;
  esac
  shift
done
shift

master="./assets/pyxel/dinoMaster.png"
out="./assets/kinds"
kindCount=16

if [ "$help" == "true" ];then
        echo "usage: pipeline.sh [-hsr]"
        echo " -h show this help"
        echo " -s split master spritesheet"
        echo " -r recolor and generate alternatives"
        echo " -u generate ui elements"
        echo " -t generate json maps"
        exit
fi


if [ "$split" == "true" ];then
    echo "split $master"
    convert ${master} -crop 384x32 ${out}/kind-%02d-00.png
fi

tiledCommand="/Applications/Tiled.app/Contents/MacOS/Tiled --export-map"
if [ "$tiled" == "true" ];then
  $tiledCommand assets/tiled/level1.tmx assets/tiled/level1.json 
fi


##
#Parameter $1 - kind prefix
# lila: #d04648/#442434
# lila2 #d2aa99/#442434
# brown: #d27d2c/#854c30
# brown2: #dad45e/#854c30
# greyish: #d2aa99/#4e4a4e
# blue: #597dce/#30346d
###
function standardTwoColor {
    convert ${out}/$1-00.png -fill '#d04648' -opaque '#6daa2c'\
                             -fill '#442434' -opaque '#346524'  ${out}/$1-01.png
    convert ${out}/$1-00.png -fill '#d27d2c' -opaque '#6daa2c'\
                             -fill '#854c30' -opaque '#346524'  ${out}/$1-02.png
    convert ${out}/$1-00.png -fill '#d2aa99' -opaque '#6daa2c'\
                             -fill '#442434' -opaque '#346524'  ${out}/$1-03.png
    convert ${out}/$1-00.png -fill '#dad45e' -opaque '#6daa2c'\
                             -fill '#854c30' -opaque '#346524'  ${out}/$1-04.png
    convert ${out}/$1-00.png -fill '#d2aa99' -opaque '#6daa2c'\
                             -fill '#4e4a4e' -opaque '#346524'  ${out}/$1-05.png
    convert ${out}/$1-00.png -fill '#597dce' -opaque '#6daa2c'\
                             -fill '#30346d' -opaque '#346524'  ${out}/$1-06.png
}

function standardOneColor {
    convert ${out}/$1-00.png -fill '#dad45e' -opaque '#6daa2c'  ${out}/$1-01.png
    convert ${out}/$1-00.png -fill '#d04648' -opaque '#6daa2c'  ${out}/$1-02.png
    convert ${out}/$1-00.png -fill '#d27d2c' -opaque '#6daa2c'  ${out}/$1-03.png
    convert ${out}/$1-00.png -fill '#346524' -opaque '#6daa2c'  ${out}/$1-04.png
}


if [ "$recolor" == "true" ];then
    echo "recolor"

    #rex
    standardOneColor kind-00

    #dimetrodon
    convert ${out}/kind-01-00.png -fill '#6daa2c' -opaque '#d2aa99' ${out}/kind-01-01.png
    convert ${out}/kind-01-00.png -fill '#6daa2c' -opaque '#d27d2c'\
                                  -fill '#346524' -opaque '#854c30'  ${out}/kind-01-02.png
    convert ${out}/kind-01-00.png -fill '#6daa2c' -opaque '#d2aa99' \
                                  -fill '#6daa2c' -opaque '#d27d2c'\
                                  -fill '#346524' -opaque '#854c30'  ${out}/kind-01-03.png
    convert ${out}/kind-01-00.png -fill '#d04648' -opaque '#d27d2c'\
                                  -fill '#442434' -opaque '#854c30'  ${out}/kind-01-04.png

    #Ankylo_1 #dad45e/ green: #6daa2c/#346524
    standardTwoColor kind-02

    #Ankylo_2 #dad45e/ green: #6daa2c/#346524  lila: #d04648/#442434 brown: #d27d2c/#854c30
    standardTwoColor kind-03

    #Steve_1 #dad45e
    standardOneColor kind-04

    #Steve_2 #dad45e
    standardTwoColor kind-05

    #Feather
    standardTwoColor kind-06

    #Parasauro
    standardTwoColor kind-07

    #Trizi
    standardTwoColor kind-08

    #Mini
    standardOneColor kind-09

    #Wusel
    standardOneColor kind-10

    #Wusel2
    standardOneColor kind-11

    #Mamal
    #Timmi
    #Bird
    #Stego
    standardTwoColor kind-15


fi

uiMaster='./assets/pyxel/rockLeaveVulcano.png'
uiOut='./assets/ui'
if [ "$ui" == "true" ];then
    convert ${uiMaster} -crop 32x32 ${uiOut}/ui-%02d.png
fi
