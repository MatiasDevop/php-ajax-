$(function(){
   console.log("jquery is working"); 
   let edit=false;
   $('#task-result').hide();
   fetchTasks();
   $('#search').keyup(function(){ // here perform search by typing.. on input
       
    if($('#search').val()){
        let search=$('#search').val();
        console.log(search);
        $.ajax({
            url:'task-search.php',
            type:'POST',
            data: {search},//this is iqual to search:search
            success: function(response){
                //console.log(response);
                let tasks = JSON.parse(response);
                let template = '';
                 tasks.forEach(task =>{
                     template +=`<li> 
                     ${task.name}
                     </li>`
                 });
                 // to fill template
                 $('#container').html(template);
                 $('#task-result').show();
            }
        })
       }
   });
   //to select
   $('#task-form').submit(function(e){
        const postData={
            name:$('#name').val(),
            description:$('#description').val(),
            id: $('#taskId').val()
        };
        // validation to update to request
        //this is as a validation to go options if then.
        let url = edit === false? 'task-add.php':'task-edit.php';
        console.log(url);
      $.post(url,postData,function(response){ // here change the task-add.php by URL
           console.log(response);
            fetchTasks();// her use de method to search all list.
            $('#task-form').trigger('reset');
      });
      e.preventDefault();
   });
   // this function execute when it start and fill list automatic..
   function fetchTasks(){
    $.ajax({
        url:'task-list.php',
        type:'GET',
        success: function(response){
            let tasks= JSON.parse(response);
            let template = '';
            tasks.forEach(task => { //the taskId is to get Id from table
                template += 
                `<tr taskId="${task.id}">
                    <td>${task.id}</td>
                    <td> 
                    <a href="#" class="task-item">${task.name}</a>
                    </td>
                    <td>${task.description}</td> 
                    <td>
                        <button class="task-delete btn btn-danger">
                            delete
                        </button>
                    </td>
                 </tr> 
                `
            });
            //here fill the template and show in tag html
            $('#tasks').html(template);           
        }
    })

   }
   // here to make the function to delete by id on click
   $(document).on('click','.task-delete', function(){
        if(confirm('Are you sure you want to delete it?')){ // to confirm or dialog 
            let element = $(this)[0].parentElement.parentElement; //here get the row complete and tag html complete to use it and after element.
            let id=$(element).attr('taskId');//get id by attribute that was on the table <tr>
            // after send it to backend to make the query.
            $.post('task-delete.php', {id}, function(response){
                fetchTasks();
                console.log(response);
            })
        }
   })
   // click or event to edit
   $(document).on('click','.task-item', function(){
        let element = $(this)[0].parentElement.parentElement; //here get the row complete and tag html complete to use it and after element.
        let id=$(element).attr('taskId');//get id by attribute that was on the table <tr>
        // after send it to backend to make the query.
        $.post('task-single.php', {id}, function(response){
           const task = JSON.parse(response);
           console.log(response);
           $('#name').val(task.name);
           $('#description').val(task.description);
           $('#taskId').val(task.id);
           edit=true;
        })
    
})

   
});