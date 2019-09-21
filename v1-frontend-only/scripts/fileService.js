

function getValidFiles(data){
    if(data.is_dark){
        return [];
    }
    
    var finalFileList = [];
    let fileUrlHost = `https://${data.d1}${data.dir}/`;
    let files = data.files;
    
    var ignoredFormats = [
        "Metadata",
            "Archive BitTorrent",
            "BitTorrent",
            "Thumbnail",
            "BitTorrentContents",
            "Text"
    ];
    
    if(files && files.length > 0){
        for(let i = 0; i< files.length; i++){
            var file = files[i];
            if(ignoredFormats.indexOf(file.format) == -1){
                finalFileList.push(`${fileUrlHost}/${file.name}`);
            }
        }
    }

    return fileFileList;
}


function processResponses(arr){
    if(arr){
        var validFiles = [];
        arr.forEach((v, i) => {
           
        });
    }
}
