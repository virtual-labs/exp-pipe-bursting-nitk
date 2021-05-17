var p=Math.floor(Math.random()*(3));
var screen=0;
var k = 0,t=1;
var spanArray;
var resBox,resVal;
 //on click of next button

var idInput = null, checkUnit = null, textDisplay = null;
var compareVal = 0, qCount = 0, resultCount = 0 ;
var ansDisplay = 0;

//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		var myDiv1  = document.getElementById("question-div");
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}


function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}

//To insert input and check button
function userCalculation(elem)
{
	ansDisplay++;
	var inputVal = document.createElement("input");
	var checkVal = document.createElement("input");
	var rightVal = document.createElement("span");
	inputVal.setAttribute("type","text");
	inputVal.setAttribute("id","res"+ansDisplay);
	inputVal.setAttribute("oninput","checkInputValid(this)")
	rightVal.setAttribute("id","rightAns"+ansDisplay);
	inputVal.classList.add("inputStyle");
	checkVal.setAttribute("type","button");
	checkVal.setAttribute("id","chk"+ansDisplay);
	checkVal.setAttribute("style","cursor:pointer");
	checkVal.setAttribute("onclick","checkResult();");
	checkVal.setAttribute("value","CHECK");
	elem.appendChild(inputVal);
	elem.appendChild(rightVal);
	elem.appendChild(checkVal);
}
function checkResult()
{
	var idd = document.getElementById("res"+ansDisplay);
	var idd1 = document.getElementById("chk"+ansDisplay);
	var ansId = document.getElementById("rightAns"+ansDisplay);
	if(simsubscreennum == 1)
	{
		compareVal = data[p][4].toFixed(2);
		checkUnit = "";
	}
	else if(simsubscreennum == 5)
	{
		compareVal = (resVal/10).toFixed(4);
		checkUnit = "kgf/mm<sup>2</sup>";
	}
	if(!idd.value  || !idd.value!=" ")
	{
		// idd.setAttribute("placeholder","Please enter value");
	}
	else if(Math.round(idd.value) != Math.round(compareVal))
	{
		// console.log(2);
		qCount++;
		// blinkStop();
		ansId.classList.remove("resultStyle");
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			idd1.parentNode.removeChild(idd1);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= compareVal+checkUnit;
			if(simsubscreennum == 1)
			{
				qCount = 0;
				var q1 = Object.create(questions);
				generateQuestion(q1,"Determine which pipe is this:","","Thin Cylinder","Thick Cylinder",0,0,2,scree1Proceed,410,140,310,100);
			}
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		idd1.parentNode.removeChild(idd1);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= compareVal+checkUnit+"<span style='color:green;font-size:20px;'>&#10004;</span>";
			if(simsubscreennum == 1)
			{
				qCount = 0;
				var q1 = Object.create(questions);
				generateQuestion(q1,"Determine which pipe is this:","","Thin Cylinder","Thick Cylinder",0,0,2,scree1Proceed,410,140,310,100);
			}
	}
}


function navNext()
{

    for (temp = 0; temp <=5; temp++) 
    { 
        document.getElementById ('canvas'+temp).style.visibility="hidden";
    }
    simsubscreennum+=1;
    document.getElementById('canvas'+(simsubscreennum)).style.visibility="visible";
    document.getElementById('nextButton').style.visibility="hidden";
    magic();
}


//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
    if(document.getElementById('arrow1').style.visibility=="hidden")
        document.getElementById('arrow1').style.visibility="visible";
    else
        document.getElementById('arrow1').style.visibility="hidden";
}
//stop blinking arrow
function myStopFunction() 
{
    clearInterval(myInt);
    document.getElementById('arrow1').style.visibility="hidden";
}

//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}
function magic()
{
	
	if (simsubscreennum==1)
	{  
	    document.getElementById('nextButton').style.visibility="hidden";	
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(220,100,270);	
		document.getElementById('can1-0').onclick=function()
		{
			myStopFunction();
			document.getElementById('can1-0').onclick = "";
			document.getElementById('can1-0').style.animation = "pipe-rotate 5s forwards ";
			setTimeout(function()
			{
				// document.getElementById('dialog-div').style.visibility="visible";
				// document.getElementById('dialog-div').style.height="100px";	
				var q1 = Object.create(questions);
				generateQuestion(q1,"Both ends of the pipe must be trimmed to ensure parallel faces. Say True/False? ","","False","True",0,0,2,showData,410,140,310,150);				
			},5300);
		}
    }
	else if (simsubscreennum==2)
	{
		document.getElementById('calc').style.visibility="hidden";	
		document.getElementById('dataset').style.visibility="hidden";	
		document.getElementById('rtval').style.visibility="hidden";	
	    document.getElementById('nextButton').style.visibility="hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(570,150,180);	
		document.getElementById('can3-5').onclick=function()
		{
			myStopFunction();
			document.getElementById('can3-5').onclick = "";
			document.getElementById('can3-5').style.top = "130px";
			document.getElementById('can3-41').style.top = "170px";
			document.getElementById('can3-42').style.top = "170px";
			document.getElementById('can3-43').style.top = "168px";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(580,370,180);	
			document.getElementById('can3-5b').onclick=function()
			{
				myStopFunction();
				document.getElementById('can3-5b').onclick = "";
				document.getElementById('can3-5b').src="images/bottomflange2.png";
				document.getElementById('can3-5b').style.top = "290px";
				document.getElementById('can3-44').style.top = "315px";
				document.getElementById('can3-45').style.top = "324px";
				document.getElementById('can3-46').style.top = "320px";
				setTimeout(function()
				{
					document.getElementById("divp").innerHTML = "Tighten the bottom vent bolts.";
					document.getElementById('dialog-div').style.visibility="visible";											
					document.getElementById('dialog-div').style.left="50px";											
					document.getElementById('dialog-div').style.top="130px";											
					document.getElementById('dialog-div').style.height="100px";				
					document.getElementById('dialog-div').style.width="220px";				
				},100);
			}
		}
		
	}
	else if (simsubscreennum==3)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('can3-1').style.visibility="hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(260,250,-90);
		document.getElementById('can4-1').onclick=function(event)
		{
			if(event.pageX>=205&& event.pageX<=320 && event.pageY>=294 && event.pageY<=386)
			{
				myStopFunction();
				document.getElementById('can4-1').onclick = "";
				document.getElementById('can4-3').style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(111,150,360);
				document.getElementById('can4-3').onclick=function(event)
				{
					if(event.pageX>=97&& event.pageX<=107 && event.pageY>=158 && event.pageY<=170)
					{
						myStopFunction();
						document.getElementById('can4-3').onclick = "";
						document.getElementById('span4').style.visibility = "visible";
						setTimeout(function()
						{
							screen = 2;
							document.getElementById('can4-3').style.visibility = "hidden";
							document.getElementById('span4').style.visibility = "hidden";
							document.getElementById("divp").innerHTML = "Let the air escape and allow some continuous leak out of oil from top vent bolt which ensures proper bleeding.";
							document.getElementById('dialog-div').style.visibility="visible";											
							document.getElementById('dialog-div').style.left="50px";											
							document.getElementById('dialog-div').style.top="130px";											
							document.getElementById('dialog-div').style.height="150px";
						},800);
					}
				}
			}
		}
		
	}	
	else if (simsubscreennum==4)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById("can4-1").style.visibility = "hidden";
		document.getElementById("can4-2").style.visibility = "hidden";
		for(var i = 1;i<=6;i++){
			document.getElementById('can4-4'+i).style.visibility="hidden";
		}
		var q2 = Object.create(questions);
		generateQuestion(q2,"To let air to escape and to allow some continuous leak out of oil _____ vent bolts are kept loose initially.","","Bottom","Top","Both top and bottom","None of the above",2,scree4Proceed,50,120,300,160);
	}
	else if(simsubscreennum==5)
	{
		document.getElementById('nextButton').style.visibility = "hidden";
		document.getElementById('can5-1').style.visibility = "hidden";
		document.getElementById('can5-2').style.visibility = "hidden";
		document.getElementById('can5-3').style.visibility = "hidden";
		document.getElementById('can5-5').style.visibility = "hidden";
		document.getElementById('span5').style.visibility = "hidden";
		for(var i = 1;i<=3;i++)
		{
			document.getElementById("can5-4"+i).style.visibility = "hidden";
			document.getElementById("can5-5"+i).style.visibility = "hidden";
		}
		for(var j = 1;j<=6;j++)
		{
			document.getElementById("can5-4"+j).style.visibility = "hidden";
		}
		spanArray = document.getElementById('result').getElementsByTagName('span');
		resBox = document.getElementById('result').getElementsByTagName('input');
		spanArray[0].innerHTML = data[p][0];
		spanArray[1].innerHTML = data[p][2];
		spanArray[2].innerHTML = data[p][0]/2;
		spanArray[3].innerHTML = data[p][1]/2;
		spanArray[4].innerHTML = data[p][3];
		resVal = (data[p][3]*(Math.pow(data[p][0]/2,2)-Math.pow(data[p][1]/2,2))/(0.173205*Math.pow(data[p][0]/2,2)));
		console.log(resVal);
		idInput = document.getElementById('res');
		userCalculation(idInput);
	}
	
}
function scree4Proceed()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(260,250,-90);
	document.getElementById('can5-1').onclick=function(event)
	{
		if(event.pageX>=205&& event.pageX<=320 && event.pageY>=294 && event.pageY<=386)
		{
			myStopFunction();
			document.getElementById('can5-1').onclick = "";
			document.getElementById('can5-3').style.visibility = "visible";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(111,150,360);
			document.getElementById('can5-3').onclick=function(event)
			{
				if(event.pageX>=97&& event.pageX<=107 && event.pageY>=158 && event.pageY<=170)
				{
					myStopFunction();
					document.getElementById('can5-3').onclick = "";
					document.getElementById('span5').style.visibility = "visible";
					document.getElementById('can5-5').style.transformOrigin = "40% 80%";
					document.getElementById('can5-5').style.animation = "needleRotate 8s  forwards";
					set();
					setTimeout(function()
					{
						twist();
					},1500);
				}
			}
		}
	}
}
function bottomBoltTight()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(585,350,180);	
	document.getElementById('can3-44').onclick=function()
	{
		myStopFunction();
		document.getElementById('can3-44').onclick = "";
		document.getElementById('can3-44').style.top = "325px";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(627,385,90);	
		document.getElementById('can3-45').onclick=function()
		{
			myStopFunction();
			document.getElementById('can3-45').onclick = "";
			document.getElementById('can3-45').style.top = "333px";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(654,385,90);	
			document.getElementById('can3-46').onclick=function()
			{
				myStopFunction();
				document.getElementById('can3-46').onclick = "";
				document.getElementById('can3-46').style.top = "326px";
				document.getElementById("can3-5d").style.visibility = "visible";
				setTimeout(function()
				{
					document.getElementById("can3-5").style.visibility = "hidden";
					document.getElementById("can3-5a").style.visibility = "hidden";
					document.getElementById("can3-5b").style.visibility = "hidden";
					document.getElementById("can3-5d").style.visibility = "visible";
					for(var i = 1;i<=6;i++){
						document.getElementById('can3-4'+i).style.visibility="hidden";
					}
					screen = 1;
					document.getElementById("divp").innerHTML = "Now connect the pipe mounted with flanges on the test platform. Ensure that the top vent bolt is loose.";
					document.getElementById('dialog-div').style.visibility="visible";											
					document.getElementById('dialog-div').style.left="50px";											
					document.getElementById('dialog-div').style.top="130px";											
					document.getElementById('dialog-div').style.height="120px";	
					document.getElementById('dialog-div').style.width="260px";	
					
				},800);
			}
		}
	}
}
function mountPipe()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(400,250,180);
	document.getElementById('can3-1').onclick=function(event)
	{
		if(event.pageX>=430 && event.pageX<=536 && event.pageY>=217 && event.pageY<=380)
		{
			myStopFunction();
			document.getElementById('can3-1').onclick = "";
			document.getElementById('can3-1').src = "images/can32.png";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(680,250,360);
			document.getElementById('can3-5d').onclick=function()
			{
				myStopFunction();
				document.getElementById('can3-5d').onclick = "";	
				document.getElementById('can3-5d').style.animation = "movePipe 1s forwards";
				setTimeout(function()
				{
					document.getElementById('can3-5d').style.visibility="hidden";
					document.getElementById('can3-1').src = "images/can33.png";
					myInt = setInterval(function(){ animatearrow(); }, 500);
					animateArrowATPosition(580,250,360);
					document.getElementById('can3-1').onclick=function(event)
					{
						if(event.pageX>=533 && event.pageX<=569 && event.pageY>=170 && event.pageY<=392)
						{
							myStopFunction();
							document.getElementById('can3-1').onclick = "";
							document.getElementById('can3-1').src = "images/can37.png";
							document.getElementById('nextButton').style.visibility="visible";
						}
					}						
				},800);
			}
		}
	}			
}
function pumpOff()
{
	document.getElementById('can4-3').style.visibility = "visible";
	document.getElementById('span4').style.visibility = "visible";
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(110,133,360);
	document.getElementById('can4-3').onclick=function(event)
	{
		if(event.pageX>=97&& event.pageX<=107 && event.pageY>=140 && event.pageY<=152)
		{
			myStopFunction();
			document.getElementById('can4-3').onclick = "";
			document.getElementById('span4').style.visibility = "hidden";	
			screen = 3;
			setTimeout(function()
			{
				document.getElementById('can4-3').style.visibility = "hidden";	
				document.getElementById("divp").innerHTML = "Now tighten the top bolt for no further leak.";
				document.getElementById('dialog-div').style.visibility="visible";											
				document.getElementById('dialog-div').style.left="50px";											
				document.getElementById('dialog-div').style.top="130px";											
				document.getElementById('dialog-div').style.width="250px";	
				document.getElementById('dialog-div').style.height="100px";	
			},800);
		}
	}
}

function boltTight()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(648,258,90);	
	document.getElementById('can4-41').onclick=function()
	{
		myStopFunction();
		document.getElementById('can4-41').onclick = "";
		document.getElementById('can4-41').style.top = "186px";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(668,258,90);	
		document.getElementById('can4-42').onclick=function()
		{
			myStopFunction();
			document.getElementById('can4-42').onclick = "";
			document.getElementById('can4-42').style.top = "186px";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(688,260,90);	
			document.getElementById('can4-43').onclick=function()
			{
				myStopFunction();
				document.getElementById('can4-43').onclick = "";
				document.getElementById('can4-43').style.top = "188px";
				document.getElementById("nextButton").style.visibility = "visible";
			}
		}
	}
}

function hideDialog()
{
	document.getElementById("dialog-div").style.visibility = "hidden";
	if(simsubscreennum == 1 && screen == 0)
	{
		showData();
	}
	else if(simsubscreennum == 1 && screen == 5)
	{
		screen = 6;
		document.getElementById("calc").style.visibility = "visible";
		document.getElementById('calc').innerHTML="The value of (r<sub>1</sub>/t)= ";
		idInput = document.getElementById('calc');
		userCalculation(idInput);
		
	}
	else if(simsubscreennum == 1 && screen == 6)
	{
		document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 2 && screen == 6)
	{
		bottomBoltTight();
	}
	else if(simsubscreennum == 2 && screen == 1)
	{
		mountPipe();
	}
	else if(simsubscreennum == 3 && screen == 2)
	{
		pumpOff();
 	}
	else if(simsubscreennum == 3 && screen == 3)
	{
		screen = 4;
		boltTight();
 	}
}
function scree1Proceed()
{
	document.getElementById("divp").innerHTML = "The minimum length to mean diameter ratio of pipe must be 3.";
	document.getElementById('dialog-div').style.visibility="visible";
	document.getElementById('dialog-div').style.height="100px";	
}
function showData()
{
	screen = 5;
	document.getElementById("dataset").style.visibility = "visible";
	document.getElementById("d1").innerHTML = data[p][0];
	document.getElementById("d2").innerHTML = data[p][1];
	document.getElementById("d3").innerHTML = data[p][2];
	document.getElementById("d4").innerHTML = data[p][0]/2;
	document.getElementById("d5").innerHTML = data[p][1]/2;
	document.getElementById("divp").innerHTML = "if r<sub>1</sub>/t &lt; 10 :Thick Cylinder <br>&nbsp;&nbsp;&nbsp; if r<sub>1</sub>/t &gt; 10 :Thin Cylinder &nbsp;";
	document.getElementById('dialog-div').style.visibility="visible";
	document.getElementById('dialog-div').style.height="100px";	
	
}	
var set = function setReadings()
{ 
	if(k<11)
	{
		if(k == 0)
			document.getElementById("span5").innerHTML = pressure[p][k]+".0";
		else
			document.getElementById("span5").innerHTML = pressure[p][k];
		k++;
		setInterval("set()",1000);
		if(k == 11	)
		document.getElementById("nextButton").style.visibility = "visible";
	}
}
var twist = function twistPipe()
{
	if(t<=3)
	{
		var m = t-1;
		if(t>1)
		{
			document.getElementById("can5-4"+m).style.visibility = "hidden";
			document.getElementById("can5-5"+m).style.visibility = "hidden";
		}
		document.getElementById("can5-4"+t).style.visibility = "visible";
		document.getElementById("can5-5"+t).style.visibility = "visible";
		t++;
		setInterval("twist()",1200);
	}
}
function checkVal()
{
	if(resBox[0].value == "")
	{
		document.getElementById("divp").innerHTML = "Please enter the value";
		document.getElementById('dialog-div').style.visibility="visible";
		document.getElementById('dialog-div').style.left="485px";	
		document.getElementById('dialog-div').style.top="420px";	
		document.getElementById('dialog-div').style.height="80px";	
		document.getElementById('dialog-div').style.width="200px";	
	}
	else 
	{
		resBox[0].value = (res/10).toFixed(4);
		resBox[0].style.border = "none";
		resBox[0].style.borderBottomStyle = "double";	
		resBox[0].disabled = true;	
		resBox[0].style.backgroundColor = "white";	
		resBox[0].style.color = "black";	
		document.getElementById('ck').style.visibility="hidden";
	}
}
function checkPipe()
{
	var pipeType = document.getElementById("sel").value;
	if(pipeType == 1)
	{
		document.getElementById("chkPipe").style.visibility = "visible";
	}
	else if(pipeType == 2)
	{
		document.getElementById("rtval").innerHTML = "<span style='color:green'>&#10004;</span>This is a Thick Cylinder.";
		document.getElementById("rtval").style.visibility = "visible";
		document.getElementById("chkPipe").style.visibility = "hidden";
		setTimeout(function()
		{
			document.getElementById("divp").innerHTML = "The minimum length to mean diameter ratio of pipe must be 3.";
			document.getElementById('dialog-div').style.visibility="visible";
			document.getElementById('dialog-div').style.height="100px";	
				document.getElementById("chkPipe").style.visibility = "hidden";

		},500);
	}
	else
	{
		document.getElementById("rtval").innerHTML = "<span style='color:red'>&#10006;</span>This is a Thick Cylinder.";
		document.getElementById("rtval").style.visibility = "visible";
		document.getElementById("chkPipe").style.visibility = "hidden";
		setTimeout(function()
		{
			document.getElementById("divp").innerHTML = "The minimum length to mean diameter ratio of pipe must be 3.";
			document.getElementById('dialog-div').style.visibility="visible";
			document.getElementById('dialog-div').style.height="100px";	
				document.getElementById("chkPipe").style.visibility = "hidden";

		},500);

	}
	
}
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
//code to get  pixel point in a page
// function getpx(event,elem)
// {
	// document.getElementById("1").innerHTML = event.pageX + " "+event.pageY;
// }



	
	
