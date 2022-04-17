const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require('os');
const { exec } = require("child_process");
(function() {
	const outputFile = '12E91D56B1F8F92DB8B9DB18CFFCD35CEF600ECA.html';

	let dir = "~";
	for(arg of process.argv){
		const [key, val] = arg.split("=");
		if(key === "dir"){
			dir = val;
		}
	}
	const output = {};
	let cnt, hits;
	[cnt, hits] = traverseDir(dir, output, [0,0]);
	const keys = (Object.keys(output).filter((k) => output[k].paths.length > 1));	
	const filteredOut = keys.reduce((acc, k) => {
		acc[k] = output[k];

		return acc;
	}, {});

	
	writeOutputHTMLFile(filteredOut);
	
	exec("xdg-open /tmp/" + outputFile);
	
	function writeOutputHTMLFile(output){
		const tempDir = os.tmpdir();
		const tempPath = path.join(tempDir, outputFile);
		const templateFile = fs.readFileSync('output.html', {encoding:'utf8', flag:'r'});
		fs.writeFileSync(tempPath,templateFile.replace("{0}", JSON.stringify(output).replaceAll("\\", "").replaceAll("'", ""))); 
	}
	function traverseDir(dir, hashDict, vals){
		[cnt, hits] = vals;
		const filenames = fs.readdirSync(dir, {withFileTypes: true});
		filenames.forEach((dirent) => {
			cnt++;
			const newPath = path.join(dir, dirent.name);
			if(dirent.isDirectory()){
				[cnt,hits] = traverseDir(newPath, hashDict, [cnt,hits]);
			}else{
				const fd = fs.createReadStream(newPath);
				const hash = crypto.createHash('sha1');
				hash.setEncoding('hex');
				let contents = false;
				try{
					contents = fs.readFileSync(newPath);
				}catch{}
				if(!contents){
					return;
				}
				hash.write(contents);
				hash.end()
				const h = hash.read();
				if(hashDict[h]){
					hits++
					hashDict[h].paths = [...hashDict[h].paths, newPath];
				}else{
					hashDict[h] = {paths: [newPath], size: contents.length};
				}
			}
				
		});
		return [cnt, hits];
	}

})();
