const url= "https://api.geekshubsacademy.com/api/cms/v1_0/public/courses"

let serviceApi=(param)=> 
    new Promise((res, rej)=>
        {
            if (!param) return $.get(url,(data)=>{
                res(data);
            })

            $.get(url+"/"+param,(data)=>{
                res(data);
            })
        })
  
      

let view=async (e)=>{
    let id = e.target.parentNode.getAttribute("id");
    $('#miModal .modal-header').empty();
    $('#miModal .modal-body').empty();
    try {
        let data = await serviceApi(id);
        let course = data.course;
        $('#miModal .modal-header').append(`<h5>${course.title}</h5>`);
        $('#miModal .modal-body').append(`<p>${course.longDescription}</p>`);
        $('#miModal').modal('toggle');
    }catch(error)
    {
        console.error(error);
    }
}        


let draw=(data)=>{

    let content = $('.content');
    let course = data.cursos;
    course.forEach(element => {
        if(element.available){
                let html = `<div class="card col-12 col-md-2">
                    <img class="card-img-top" src="${((element.urlImg)? 
                        element.urlImg: 'https://geekshubsacademy.com/images/press/creatividades/2.png') }" 
                        alt="Card image cap">
                    <div class="card-body" id="${element.id}">
                     <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.shortDescription}</p>
                    <button type="button" class="btn btn-primary"  onClick="view(event)">Más información</button>
            </div>
            </div>`
            content.append(html);
        }
        
    });
}
        

let init = async () =>{
   try{
    let data = await serviceApi();
    draw(data);
   }catch(error){
       console.error(error);
   }
}




$(document).ready(()=>{
    init();
})