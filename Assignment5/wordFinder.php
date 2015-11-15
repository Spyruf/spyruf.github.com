<?php 

$string = $_REQUEST["string"];
$first = $_REQUEST['first']; 
$last = $_REQUEST['last']; 
$nthn = $_REQUEST['nthn']; 
$nthl = $_REQUEST['nthl']; 

$main = array();
$temp = array();

$letters = array(); // array of letters
$count = array(); // count of how many letters


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

// checks if word can be formed
/*
for($x=0; $x< strlen($string) ; $x++){
    
    $char = substr($string,$x,1); // gets current character at $x
    $exists = FALSE;
    
    for($i = 0; $i< count($letter); $i++){ // loops through letter array
        if($letter[$i] == $char){  // checks if letter already exists
            $count[$i] = $count[$i] + 1; // if it exists, update count array
            $exists = TRUE;
            echo "---updated the count";
        }    
    }
    
    if($exists == FALSE){
        $letter[] = $char;
        $count[] = 1;
        echo"---added a letter";
    }
}
*/
echo "<pre>";
print_r($main); 
?>