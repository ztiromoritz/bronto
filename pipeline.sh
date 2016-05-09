#!/bin/bash
cd "$(dirname "$0")"

set -- `getopt "hrsaut" "$@"`
while :; do
  case "$1" in
    -h) help="true" ;;
    -s) split="true" ;;
    -r) recolor="true" ;;
    -a) avatar="true";;
    -u) ui="true";;
    -t) tiled="true";;
    --) break ;;
  esac
  shift
done
shift

if [ "$help" == "true" ];then
        echo "usage: pipeline.sh [-hsr]"
        echo " -h show this help"
        echo " -s split master spritesheet"
        echo " -r recolor and generate alternatives"
        echo " -a create avatar images"
        echo " -u generate ui elements"
        echo " -t generate json maps"
        exit
fi

KINDS_MASTER="./assets/pyxel/dinoMaster.png"
KINDS_OUT="./assets/kinds"
KINDS_MAPFILE="./assets/kinds/kinds.js"
TILED_COMMAND="/Applications/Tiled.app/Contents/MacOS/Tiled --export-map"
UI_MASTER='./assets/pyxel/rockLeaveVulcano.png'
UI_OUT='./assets/ui'

if [ "$split" == "true" ];then
    echo "split $KINDS_MASTER"
    convert ${KINDS_MASTER} -crop 384x32 ${KINDS_OUT}/kind-%02d-00.png
fi

if [ "$tiled" == "true" ];then
    echo "create json tiled map"
    $TILED_COMMAND assets/tiled/level1.tmx assets/tiled/level1.json
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
    for x in {0..6}; do echo "['$2',0,0,'$1-0$x.png',32,32,0,0]," >> $KINDS_MAPFILE; done
    convert ${KINDS_OUT}/$1-00.png -fill '#d04648' -opaque '#6daa2c'\
                             -fill '#442434' -opaque '#346524'  ${KINDS_OUT}/$1-01.png
    convert ${KINDS_OUT}/$1-00.png -fill '#d27d2c' -opaque '#6daa2c'\
                             -fill '#854c30' -opaque '#346524'  ${KINDS_OUT}/$1-02.png
    convert ${KINDS_OUT}/$1-00.png -fill '#d2aa99' -opaque '#6daa2c'\
                             -fill '#442434' -opaque '#346524'  ${KINDS_OUT}/$1-03.png
    convert ${KINDS_OUT}/$1-00.png -fill '#dad45e' -opaque '#6daa2c'\
                             -fill '#854c30' -opaque '#346524'  ${KINDS_OUT}/$1-04.png
    convert ${KINDS_OUT}/$1-00.png -fill '#d2aa99' -opaque '#6daa2c'\
                             -fill '#4e4a4e' -opaque '#346524'  ${KINDS_OUT}/$1-05.png
    convert ${KINDS_OUT}/$1-00.png -fill '#597dce' -opaque '#6daa2c'\
                             -fill '#30346d' -opaque '#346524'  ${KINDS_OUT}/$1-06.png
}

function standardOneColor {
    for x in {0..4}; do echo "['$2',0,0,'$1-0$x.png',32,32,0,0]," >> $KINDS_MAPFILE; done
    convert ${KINDS_OUT}/$1-00.png -fill '#dad45e' -opaque '#6daa2c'  ${KINDS_OUT}/$1-01.png
    convert ${KINDS_OUT}/$1-00.png -fill '#d04648' -opaque '#6daa2c'  ${KINDS_OUT}/$1-02.png
    convert ${KINDS_OUT}/$1-00.png -fill '#d27d2c' -opaque '#6daa2c'  ${KINDS_OUT}/$1-03.png
    convert ${KINDS_OUT}/$1-00.png -fill '#346524' -opaque '#6daa2c'  ${KINDS_OUT}/$1-04.png
}


if [ "$recolor" == "true" ];then
    echo "recolor and create mapfile"
    echo -n "" > $KINDS_MAPFILE
    echo "/* [kind,offset_x,offset_y,filename,body_width,body_height,body_offset_x,body_offset_y] */" >> $KINDS_MAPFILE #clear mapfile
    echo "var KINDS_MAP = [" >> $KINDS_MAPFILE


    #rex
    standardOneColor kind-00 rex

    #dimetrodon
    for x in {0..4}; do echo "['dimetrodon',0,0,'kind-01-0$x.png',32,32,0,0]," >> $KINDS_MAPFILE; done
    convert ${KINDS_OUT}/kind-01-00.png -fill '#6daa2c' -opaque '#d2aa99' ${KINDS_OUT}/kind-01-01.png
    convert ${KINDS_OUT}/kind-01-00.png -fill '#6daa2c' -opaque '#d27d2c'\
                                  -fill '#346524' -opaque '#854c30'  ${KINDS_OUT}/kind-01-02.png
    convert ${KINDS_OUT}/kind-01-00.png -fill '#6daa2c' -opaque '#d2aa99' \
                                  -fill '#6daa2c' -opaque '#d27d2c'\
                                  -fill '#346524' -opaque '#854c30'  ${KINDS_OUT}/kind-01-03.png
    convert ${KINDS_OUT}/kind-01-00.png -fill '#d04648' -opaque '#d27d2c'\
                                  -fill '#442434' -opaque '#854c30'  ${KINDS_OUT}/kind-01-04.png

    #Ankylo_1 #dad45e/ green: #6daa2c/#346524
    standardTwoColor kind-02 ankylo
    #Ankylo_2 #dad45e/ green: #6daa2c/#346524  lila: #d04648/#442434 brown: #d27d2c/#854c30
    standardTwoColor kind-03 ankylo

    #Steve_1 #dad45e
    standardOneColor kind-04 steve

    #Steve_2 #dad45e
    standardTwoColor kind-05 steve

    #Feather
    standardTwoColor kind-06 feather

    #Parasauro
    standardTwoColor kind-07 parasauro

    #Trizi
    standardTwoColor kind-08 trizi

    #Mini
    standardOneColor kind-09 mini

    #Wusel
    standardOneColor kind-10 wusel

    #Wusel2
    standardOneColor kind-11 wusel

    #Mammal
    echo "['mammal',0,0,'kind-01-00.png',17,12,3,20]," >> $KINDS_MAPFILE;
    #Timmi
    echo "['timmi',0,0,'kind-01-00.png',32,32,0,0]," >> $KINDS_MAPFILE;
    #Bird
    echo "['bird',0,0,'kind-01-00.png',32,32,0,0]," >> $KINDS_MAPFILE;
    #Stego
    standardTwoColor kind-15 stego

    echo "[]];" >> $KINDS_MAPFILE;

fi

if [ "$avatar" == "true" ]; then
    cd $KINDS_OUT
    for img in *.png;do
	    echo $img
	    convert +repage -crop 32x32+0+0 $img ./avatars/$img 
    done
    cd "$(dirname "$0")"
fi

if [ "$ui" == "true" ];then
    echo "create ui elements"
    convert ${UI_MASTER} -crop 32x32 ${UI_OUT}/ui-%02d.png
fi
