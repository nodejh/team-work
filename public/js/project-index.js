$('#project-body').load(function () {
    var parent = document.getElementById("project-body");
    var html="";
    for(var i=0;i<project.length;i++)
    {
        html +=" <a><span> <img src='tasks.png'/>"+project[i].name+"</span></a>";
    }
    parent.innerHTML=html;
});