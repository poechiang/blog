const domain = 'http://localhost:10000';
export default (url,options={})=>{

    url = (url.split('/')||[]).filter((item)=>(!!item)).join('/');
    let {headers={},...others} = options;
    if(!headers['x-requested-with']){
        headers['x-requested-with'] = 'XMLHttpRequest';
    }

    return fetch(`${domain}/${url}`,{headers,...others}).then((resp)=>(resp.json()))
}