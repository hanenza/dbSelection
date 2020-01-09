angular.module("dbSelection")
  .controller("UMLEditorController", ["$scope","$document","$window","$http", function($scope, $document,$window,$http) {
  
  //for links between class to build the graph
  this.linksBclass=[]
  //for saving the attribute array
  this.attributeArray=[];
  // list that contain all element in the graph
  this.allElement=[]
  // the uml var , using this var we import our class from the package
  var uml = joint.shapes.uml;
  var self=this;
  $scope.links=['Association','Aggregation','Generalization','Composition'];
  // temp var for the edit classes modal
  var golbalCounter=0 ;
  //this var is define if the creation modal is open
  this.classModalOpen=false;
  //this var save the information about the current element for editing , very important var
  currentElement=null;
   //for element link
  ElementLinkTarget=null;
  ElementLinkSourse=null;
  // the graph , the main window in the uml editor
  var graph = new joint.dia.Graph;
  // we define the dimensions of the graph ,height, wight

  var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: '1200px',
    height: '600px',
    gridSize: 1
  });
  // this css style for when the user click a right click on some class the window apperaed on the mouse click position
  $scope.modalStyle = {
    "position": "absolute",
    "left": "20%",
    "top": "50%",
    "margin-left": "-150px",
    "margin-top": "-150px"
  }

  // this function for the linking between the class | need implementaion by Ibrahim
  self.linkit=function(){
    if($scope.selectedLink=='Aggregation'){
      var link=new  uml.Aggregation({ source: { id:ElementLinkSourse.model.id }, target: { id: ElementLinkTarget.model.id}})
    }else{
      if($scope.selectedLink=='Generalization'){
        var link=new uml.Generalization({ source: { id:ElementLinkSourse.model.id}, target: { id: ElementLinkTarget.model.id},   })
      }else{
        if($scope.selectedLink=='Composition'){
          var link=new uml.Composition({ source: { id:ElementLinkSourse.model.id}, target: { id: ElementLinkTarget.model.id},   })
        }
        else{
          var link=new uml.Association({ source: { id:ElementLinkSourse.model.id}, target: { id: ElementLinkTarget.model.id},   })
        }
      }
    }
    graph.addCell(link);
    ElementLinkSourse=null;
    ElementLinkTarget=null;
  };
   
  // this loop for creation 30 classes in the corner => to implementaion the drag and drop
  for(var i=0 ;i<30;i++){
    createDefault();
  }

  // this function is for creating a class in the corner of the graph 
  function createDefault(){
    var defaultClass= new uml.Class({
    position: { x:1123  , y: 0},
    size: { width: 75, height: 50 },
    name: "class",
    attributes: [],
    attrs: {
        '.uml-class-name-rect': {
            fill: '#ff8450',
            stroke: '#fff',
            'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
            fill: '#fe976a',
            stroke: '#fff',
            'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
            fill: '#fe976a',
            stroke: '#fff',
            'stroke-width': 0
        },
        '.uml-class-attrs-text': {
            'ref-y': 0.5,
            'y-alignment': 'middle',
            fontSize:10
        },
        '.uml-class-methods-text': {
          'ref-y':0,
          'y-alignment': 'middle',
          fontSize:0
      },
        '.uml-class-name-text': {
          'ref-y': 0.5,
          'y-alignment': 'middle',
          fontSize:10
      },       
  }})
  graph.addCell(defaultClass);
  };

  //this function is for creating a class in a random position on the graph , we called this functions by clicking the submit into the multiclass button
  this.createClass=function(){
    this.showingMultiClassCreationModal();
    this.classModalOpen=true;
    $scope.ElementType='Class';
    $scope.creationName='Class';
    currentElement = new uml.Class({
      position: { x:Math.floor(Math.random() * 500)  , y: Math.floor(Math.random() * 500)},
      size: { width: 75, height: 50 },
      name: $scope.elementName,
      attributes: this.attributeArray,
      attrs: {
          '.uml-class-name-rect': {
              fill: '#ff8450',
              stroke: '#fff',
              'stroke-width': 0.5
          },
          '.uml-class-attrs-rect': {
              fill: '#fe976a',
              stroke: '#fff',
              'stroke-width': 0.5
          },
          '.uml-class-methods-rect': {
              fill: '#fe976a',
              stroke: '#fff',
              'stroke-width': 0
          },
          '.uml-class-attrs-text': {
              'ref-y': 0.5,
              'y-alignment': 'middle',
              fontSize:10
          },
          '.uml-class-methods-text': {
            'ref-y':0,
            'y-alignment': 'middle',
            fontSize:0
        },
          '.uml-class-name-text': {
            'ref-y': 0.5,
            'y-alignment': 'middle',
            fontSize:10
        },       
  }})};

  //this function is creationg a class that his name , attribute and position were taken in the args
  this.copyClass=function(name,attributes,position){
    $scope.ElementType='Class';
    $scope.creationName='Class';
    var copyClass = new uml.Class({
      position: position,
      size: { width: 75, height: 50 },
      name: name,
      attributes: attributes,
      attrs: {
          '.uml-class-name-rect': {
              fill: '#ff8450',
              stroke: '#fff',
              'stroke-width': 0.5
          },
          '.uml-class-attrs-rect': {
              fill: '#fe976a',
              stroke: '#fff',
              'stroke-width': 0.5
          },
          '.uml-class-methods-rect': {
              fill: '#fe976a',
              stroke: '#fff',
              'stroke-width': 0
          },
          '.uml-class-attrs-text': {
              'ref-y': 0.5,
              'y-alignment': 'middle',
              fontSize:10
          },
          '.uml-class-methods-text': {
            'ref-y':0,
            'y-alignment': 'middle',
            fontSize:0
        },
          '.uml-class-name-text': {
            'ref-y': 0.5,
            'y-alignment': 'middle',
            fontSize:10
        },       
  }})
  console.log(currentElement)
  console.log("saleem kalb")
  console.log(graph)
  // adding element (class) to the graph
  graph.addCell(copyClass);
  };

  // this function is called from the html function when the user click on the class button above the graph
  this.openMultiClassCreationModal=function(){
    this.showingMultiClassCreationModal();
    this.classModalOpen=true;
    $scope.ElementType='Class';
    $scope.creationName='Class';
  };

  // the function is add input for new attribute in the edit window modal
  this.addAttributeInput=function(){
    var myElements = document.querySelector('#addingAttributeInputs');
    var input= document.createElement("INPUT");
    input.setAttribute("style", "width:170px; height:14px ;display:block;margin-top:0px;");
    input.setAttribute("type", "text");
    input.setAttribute("value", "");
    input.setAttribute("ng-model","attributeSaleem");
    input.setAttribute("id","tempId"+golbalCounter);
    // the golbalCounter is count how many inputs the user adding in this window modal
    golbalCounter=golbalCounter+1;
    myElements.append(input);
  }

  // this function is called after click in the updating class in the edit class modal , using this function we update the class 
  this.updateClass=function(){
    // the biglist will contian the current class attributes with the new class attributes
    var bigList=[]
    var i ;
    // the attibuteInputs list is contaion the old attribute for the class
    for (i=0;i<$scope.attributesInputs.length;i++){
      if($scope.attributesInputs[i].l!=undefined &&$scope.attributesInputs[i].l!="")
      bigList.push($scope.attributesInputs[i].l);
    }
    var temp=currentElement.model.attributes.attributes.length;
    for (i=0;i<golbalCounter+temp;i++){
      if(angular.element(document.querySelector('#tempId'+i)).val()!=undefined && angular.element(document.querySelector('#tempId'+i)).val()!=''){
        if(bigList.indexOf(angular.element(document.querySelector('#tempId'+i)).val())<0){
        bigList.push(angular.element(document.querySelector('#tempId'+i)).val());
        }
      }
    }
    // logic , in this function we combine the old attribute with the new attributes and makes a class via copy class function and delete the old class
    var postion =currentElement.model.attributes.position;
    this.copyClass($scope.name,bigList,postion);
    console.log(currentElement.model.cid);
    graph.getCell(currentElement.model.cid).remove();
    //currentElement.remove();
    self.closeEditWindow();
  }

  // this function is deleting all the attributes inputs from the edit window modal 
  function deleteAllAttributesInputs(){
    var myElements = document.querySelector('#addingAttributeInputs');
    try{
      while(true){
        myElements.removeChild(myElements.childNodes[0]);
      }
    }
    catch(error){
    }
  };

  // this function is for adding attribute for class into the multiclass creation window
  this.addAttribute=function(){
    //if the modal is open 
    if(this.classModalOpen){
      //check if the element not inside the list
      if(this.attributeArray.indexOf($scope.attribute)==-1){
        this.attributeArray.push($scope.attribute);
      var i;
      var tmp=[];
      tmp.push('Attribute:   ');
      for(i=0;i<this.attributeArray.length;i++){
        if(i!=this.attributeArray.length-1){
        tmp.push(i+") "+this.attributeArray[i]+"  ,");
        }
        else{
          tmp.push(i+") "+this.attributeArray[i]+"  .");
        }
      }
      $scope.attributeArray=tmp;
      }
    }
  };

  //this function is for the submit button in the multiclass creation window modal
  this.submit=function(){
    if(this.classModalOpen){
      this.createClass();              
    }
    graph.addCell(currentElement);
    this.allElement.push(currentElement);
    this.clearAllFields();
  };

  //this function for showing the modal window , creation modal window
  this.showingMultiClassCreationModal=function () {
    var target = $document[0].getElementById('multiClassModal');
    target.style.display='block';
  };
  
  //this function for showing the modal window ,editing modal window
  this.showEditWindowModal=function () {  
    var target = $document[0].getElementById('editModal');
    target.style.display='block';
    deleteAllAttributesInputs();
  };

  // this function close the creation modal and 
  this.closeCreationModal=function () {
    document.getElementById('multiClassModal').style.display='none';
    this.clearAllFields();
    this.classModalOpen=false;
    this.interfaceModalOpen=false;
    this.abstractModalOpen=false;
  };

  // this function is close the edit window modal
  this.closeEditWindow=function () {
    if($scope.name!=''){
    document.getElementById('editModal').style.display='none';
    golbalCounter=0;
    }
    else{
      window.alert("Please , Enter Name For The Class");
    }
  };

  // this functions is clear all vars and got the uml editor to inital mode
  this.clearAllFields=function () {
    $scope.attribute='';
    $scope.elementName='';
    this.attributeArray=[];
    //for elemnt detalis
    currentElement=null;
    $scope.attributeArray=[]
  };

  // we called this functions to before start the uml editor window
  self.showEditWindowModal();
  self.closeEditWindow();
    
    paper.on({
    'element:contextmenu': onElementRightClick
    });
  
    paper.on({
      'element:pointerdblclick': doubleementClick
     });
  //this function to prepare the target and source and send to the link function
  function doubleementClick(elementView){
    if(ElementLinkSourse==null){
      ElementLinkSourse=elementView;
    }else{
       ElementLinkTarget=elementView;

       console.log($scope.selectedLink)
       self.linkit();
    }
  }
  // this function is two showing the edit class window by click right click right click on any class
  function onElementRightClick(elementView) {
    $scope.modalStyle = {
      "position": "absolute",
      "left":Number(event.clientX)+50+"px",
      "top": Number(event.clientY)+100+"px",
      "margin-left": "-150px",
      "margin-top": "-150px"
    }
    currentElement=elementView;
    setInputs(elementView);
    self.showEditWindowModal();
  }

  // this function is for set the class attribute inputs in the edit window modal
  setInputs =  function(elementView){
  $scope.name = elementView.model.attributes.name;
  var i ;
  var tmp=[];
  for (i=0 ;i<elementView.model.attributes.attributes.length;i++){
    var str={"l":elementView.model.attributes.attributes[i]};
    tmp.push(str);
  }
  $scope.attributesInputs =tmp;
    // this function is to update the view of the updaing modal , we should call applay to refresh th view 
    $scope.$apply();
  }

  // this function is delete the current element var from the graph
  this.deleteElement=function() {
    graph.getCell(currentElement.model.cid).remove();
    //currentElement.remove();
    self.closeEditWindow();
  };


  self.sendRequest=function(){
    $http.post('http://127.0.0.1:5000/',graph).then(function (response) {
      genTable(response);
  }, function (errResponse) {
    console.log("step 2");
    });
  }

  function genTable(data){
    console.log(data);
    var table="<table><tr><td></td>"
    console.log(data.data.data[0][0]);
    var list=data.data.data;
    var i ;
    var j ;
    for (i=0;i<list.length;i++){
      for (j=0;j<list[0].length;j++){
        // the first row in the table
        if(i==0){
          table=table+"<th>"+list[i][j]+"</th>"
          if(j==list[0].length-1){
            table=table+"</tr>"
          }
        }
        else{
          if(j==0){
            table=table+"<tr><th>"+list[0][i-1]+"</th>"+"<td>"+list[i][j]+"</td>"
          }
          else{
            table=table+"<td>"+list[i][j]+"</td>"
            if(j==list[0].length-1){
              table=table+"</tr>"
            }
          }
        }
      }
    }
    table=table+"</table>"
    var myElements = document.querySelector('#showMatrixTable');
    try{
      while(true){
        myElements.removeChild(myElements.childNodes[0]);
      }
    }
    catch(error){
    }
    var htmlStr = '<div class="row dataPane"> '+table+' </div>';
    angular.element(document.getElementById('showMatrixTable')).append(htmlStr);
  }


  this.showMatrixWindowModal=function () {  
    console.log(graph);
    self.sendRequest();
    var target = $document[0].getElementById('showMatrix');
    target.style.display='block';
  };
  
  this.closeMatrixWindowModal=function () {  
    document.getElementById('showMatrix').style.display='none';
  };

  }]);
  
  

