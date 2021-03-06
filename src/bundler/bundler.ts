import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import { Cell } from '../redux/Cell';

let service: esbuild.Service;
const showFunction = `
//import _React from 'react';
//import _ReactDOM from 'react-dom';
var show = (value) =>{
  const root = document.querySelector("#root");
  if(typeof value === 'object'){
    if(value.$$typeof && value.props){
      if(ReactDOM){
        ReactDOM.render(value, root);
      }
    }else{         
      root.innerHTML = JSON.stringify(value);
    }
  }else {
    root.innerHTML = value;
  }
}`;

const bundle = async (rawCode: { [key: string]: Cell }, fileToRun: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
		});
	}

	try {
		const processedCode: { [key: string]: Cell } = JSON.parse(JSON.stringify(rawCode));

		for (let cell of Object.values(processedCode)) {
			if (cell.type === 'code' && cell.fileType === '.js') {
				const newCode = [ showFunction, cell.content ].join('\n');
				cell.content = newCode;
			}
		}

		const result = await service.build({
			entryPoints: [ fileToRun ],
			bundle: true,
			write: false,
			plugins: [ unpkgPathPlugin(), fetchPlugin(processedCode) ],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window'
			}
			//jsxFactory: "_React.createElement",
			//jsxFragment: "_React.Fragment",
		});
		return { code: result.outputFiles[0].text, error: '' };
	} catch (error) {
		console.log('BUNDLING ERROR');
		console.log(error.message);
		return {
			code: '',
			error: error.message
		};
	}
};

export default bundle;
