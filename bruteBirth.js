
const fs = require('fs');

let delimit = [];
let days_arr = [];
let month_arr = [];
let year_arr = [];
let full = [];

const opt = {
    json:false,
    s:{pos:'',val:''},
    e:{pos:'',val:''},
    d:{pos:'',val:''},
    p:{pos:'',val:''}
}

for (let key in opt) {

    if(typeof opt[key]==='boolean'){
        (process.argv.indexOf(`-${key}`)!==-1) ?  opt[key] = true : opt[key] = false
    }
    else{
        opt[key].pos = process.argv.indexOf(`-${key}`);
        (opt[key].pos!==-1) ? opt[key].val = process.argv[opt[key].pos+1] : opt[key].val = false
    }

}

const start_year = Number(opt.s.val);
const end_year = Number(opt.e.val);
const separetor_args = opt.d.val; 

if(separetor_args){  delimit = separetor_args.split(''); delimit.push(''); } 
else{ delimit = [ '','-','/']; } //default values

function days(){
    for( let d=1; d<10; d++ ){
        days_arr.push(d); days_arr.push(`0${d}`)
    }
    for( let d=10; d<=31; d++ ){
        days_arr.push(d);
    }
}

function month(){
    for( let m=1; m<10; m++ ){
        month_arr.push(m); month_arr.push(`0${m}`)
    }
    for( let m=10; m<=12; m++ ){
        month_arr.push(m);
    }
}

function year(){
    for(let y=start_year; y<=end_year; y++){
        let split_y = y.toString();
        year_arr.push(y); year_arr.push(`${split_y[2]}${split_y[3]}`);
    }
}

days(); month(); year();

function combine(){

    for(let y=0;y<year_arr.length; y++){
        for(let m=0; m<month_arr.length; m++){
            for(let d=0;d<days_arr.length;d++){
                for(let s=0;s<delimit.length; s++){
                    full.push(`${days_arr[d]}${delimit[s]}${month_arr[m]}${delimit[s]}${year_arr[y]}`);
                    full.push(`${days_arr[d]}${delimit[s]}${year_arr[y]}${delimit[s]}${month_arr[m]}`);
                    full.push(`${month_arr[m]}${delimit[s]}${days_arr[d]}${delimit[s]}${year_arr[y]}`);
                    full.push(`${month_arr[m]}${delimit[s]}${year_arr[y]}${delimit[s]}${days_arr[d]}`);
                    full.push(`${year_arr[y]}${delimit[s]}${days_arr[d]}${delimit[s]}${month_arr[m]}`);
                    full.push(`${year_arr[y]}${delimit[s]}${month_arr[m]}${delimit[s]}${days_arr[d]}`);
                }
            }
        }
    }

}

combine();

const path = (opt.p.val) ? opt.p.val : './bruteBirth';

if(!opt.json){
    for(let i=0;i<full.length;i++){ fs.appendFileSync(`${path}.txt`, `${full[i]}\n`); }
    }
else{ fs.writeFileSync(`${path}.json`, JSON.stringify(full, null, 4)) }




