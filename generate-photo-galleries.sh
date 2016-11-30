#!/bin/bash

enumerate_pictures(){
first=true
for photo in $(ls ./img/galerie-photo/${current_galerie_name});
do
  current_photo=${photo}
  echo " - image_path: /img/galerie-photo/${current_galerie_name}/${current_photo}" >> ${current_galerie_file}
  echo "   caption:" >> ${current_galerie_file}
  echo "   copyright:" >> ${current_galerie_file}
done 
}

set_galerie_info_from_config_file(){
galerie_config_file=./img/galerie-photo/${current_galerie_name}/.galerie.conf
galerie_title=$(cat ${galerie_config_file} | grep title | sed 0,/title=/{s/title=//})
galerie_date=$(cat ${galerie_config_file} | grep date | sed 0,/date=/{s/date=//})
galerie_cover=$(cat ${galerie_config_file} | grep cover | sed 0,/cover=/{s/cover=//})
}

set_default_galerie_info(){
galerie_title=${current_galerie_name}
galerie_date="Inconnue"  
galerie_cover=$(echo $(ls ./img/galerie-photo/${current_galerie_name}/) | cut -d" " -f1)
}

set_galerie_info(){
if [ -e ./img/galerie-photo/${current_galerie_name}/.galerie.conf ]
then
  set_galerie_info_from_config_file
else
  set_default_galerie_info
fi
}

add_galerie_to_galerie_collection(){
echo " - image_path: /img/galerie-photo/${current_galerie_name}/${galerie_cover}" >> ${galeries_collection_file}  
echo "   gallery-folder: /galerie-photo/${current_galerie_name}/" >> ${galeries_collection_file}
echo "   gallery-name: ${galerie_title}" >> ${galeries_collection_file}
echo "   gallery-date: ${galerie_date}" >> ${galeries_collection_file}
}

add_galerie_header() {
echo "---" > ${current_galerie_file}
echo "layout: page" >> ${current_galerie_file}
echo "title: \"galerie photo\"" >> ${current_galerie_file}
echo "description: \"${galerie_title}\"" >> ${current_galerie_file}
echo "active: gallery" >> ${current_galerie_file}
echo "header-img: \"img/galerie-photo-bg.jpg\"" >> ${current_galerie_file}
echo "album-title: \"${galerie_title}\"" >> ${current_galerie_file}
echo "permalink: /galerie-photo/${current_galerie_name}/" >> ${current_galerie_file}
echo "images:" >> ${current_galerie_file}
}

add_galerie_footer() {
echo "---" >> ${current_galerie_file}
echo "" >> ${current_galerie_file}
echo "{% include galerie.html %}" >> ${current_galerie_file}

}

add_galerie_collection_header() {
echo "---" > ${galeries_collection_file}
echo "layout: page" >> ${galeries_collection_file}
echo "title: \"galerie Photo\"" >> ${galeries_collection_file}
echo "description:" >> ${galeries_collection_file}
echo "active: gallery" >> ${galeries_collection_file}
echo "header-img: \"img/galerie-photo-bg.jpg\"" >> ${galeries_collection_file}
echo "images:" >> ${galeries_collection_file}
}


add_galerie_collection_footer() {
echo "---" >> ${galeries_collection_file}
echo "" >> ${galeries_collection_file}
echo "{% include galerie-collection.html %}" >> ${galeries_collection_file}
}



galeries_collection_file="./galerie-photo/index.html"
mkdir -p ./galerie-photo

current_galerie_file=""
current_galerie_name=""
current_photo=""

add_galerie_collection_header

for gal in $(ls -r ./img/galerie-photo/);
do
  current_galerie_name=${gal}
  mkdir -p ./galerie-photo/${current_galerie_name}
  set_galerie_info
  current_galerie_file="./galerie-photo/${current_galerie_name}/index.html"
  add_galerie_to_galerie_collection
  add_galerie_header
  enumerate_pictures
  add_galerie_footer
done

add_galerie_collection_footer