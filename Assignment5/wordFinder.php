<?php 

$string = $_REQUEST["string"];
$first = $_REQUEST['first']; 
$last = $_REQUEST['last']; 
$nthn = $_REQUEST['nthn']; 
$nthl = $_REQUEST['nthl']; 

$main = array();
$temp = array();

echo $string;
echo $first;
echo $last;
echo $nthn;
echo $nthl;
echo "ended";

/* method of attack
1. find words that start wtih letter
2. find words that end with letter
3. find words that have n character as letter something different
4. check if word can be formed with letters

return main array

-set main = temp
-clear temp
*/
function update(){
    global $main, $temp;
    $main = array();
    $main = $temp;
    $temp = array();
}

// put all the words in the array first then u just have to worry about the array 
$myfile = fopen("CompleteScrabbleWordlist.txt", "r") or die("Unable to open file!");
while(!feof($myfile)) { 
            
    $current = fgets($myfile); // gets the current word in txt file
    $main[] = $current; // adds to main array    
}
fclose($myfile);


//1. first letter(s)
if($first != null){
    
    for($x = 0; $x < count($main); $x++) {

        $current = $main[$x];
        $number = substr_compare($first,$current,0,strlen($first),TRUE); // compares first letters of input and first letters of current word
b 
        if($number == 0){
            $temp[] = $current; 
        }          
    }
    update();

}


//2. last letter(s)
if($last != null){
    
    for($x = 0; $x < count($main); $x++) {

        $current = $main[$x];    

        
        if (strlen($current) >= strlen($last)){ // makes sure that what you are looking for is less than the current word

            $number = substr_compare($current, $last, strlen($current)-strlen($last)-1, strlen($last),TRUE); // -1 because it starts at 0
            if($number == 0){
                $temp[] = $current; 
            }    
        }

    }
    echo "second ran";
    update();

}





//3. n charcter as letter
/*
if($nthn != null && $nthl !=null){
    
    for($x = 0; $x < count($main); $x++) {

        $current = $main[$x];
        
        if(strlen($current) <= $nthn){
            echo $nthn;
            $number = substr_compare($current, $nthl, $nthn - 1 ,1,TRUE); // compares first letters of input and first letters of current word

            if($number == 0){
                $temp[] = $current; 
            }       

        }
    }
    update();

}
*/


echo "<pre>";
print_r($main); 


/*

// 1. first letter
if($first != ""){
    while(!feof($myfile)) { 
        
            $current = fgets($myfile); // gets the current word in txt file
            $number = substr_compare($first,$current,0,strlen($first),TRUE); // compares first letters of input and current word
            if($number == 0){
                $main[] = $current; 
            }        
    }
}
fclose($myfile);

/*

if($last != ""){

}


/*

$myfile = fopen("CompleteScrabbleWordlist.txt", "r") or die("Unable to open file!");


//starting with letter 
$startingwith = array();

// loops through the txt file until it reaches the end
while(!feof($myfile)) { 
   
    $current = fgets($myfile); // gets the current word in txt file
    $number = substr_compare($string,$current,0,$length,TRUE); // compares first letters of input and current word
    
    if($number == 0)
    {
        $startingwith[] = $current;
        
    }
    
}

fclose($myfile);
    
//checks if any there are any words
if( count($startingwith) == 0){
    echo "Oh No! No Possible Words!";
}

//echoes startingwith array
for($x = 0; $x < count($startingwith); $x++) {
    
    if($x != count($startingwith) - 1 ){
        echo $startingwith[$x] . ",";
    }
    else{
        echo $startingwith[$x];
    }
}

echo "ended";
*/

?>