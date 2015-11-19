<?php 


echo "<pre>";

$string = $_REQUEST["string"];
$first = $_REQUEST['first']; 
$last = $_REQUEST['last']; 
//$nthn = $_REQUEST['nthn']; 
//$nthl = $_REQUEST['nthl']; 

$main = array();
$temp = array();

$letters = array(); // array of letters
$count = array(); // count of how many letters

$wl = array(); 
$wc = array(); 


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
    $count = 0;
    $main = array();
    /*
    for($x = 0; $x < sizeof($temp); $x++){
        if($temp[$x] != null){
            $s = $temp[$x];
            $main[$count] = (string)$s;
            $count = $count + 1;
        }
    }
    */
    foreach ($temp as &$value) {
        $main[] = trim($value);
    }
    unset($value); // break the reference with the last element

    //$main = $temp;
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
    
    for($x = 0; $x < sizeof($main); $x++) {

        $current = $main[$x];
        $number = substr_compare($first,$current,0,strlen($first),TRUE); // compares first letters of input and first letters of current word

        if($number == 0){
            $temp[] = $current; 
        }          
    }
    update();

}


//2. last letter(s)
if($last != null){
    
    for($x = 0; $x < sizeof($main); $x++) {

        $current = $main[$x];    

        
        if (strlen($current) >= strlen($last)){ // makes sure that what you are looking for is less than the current word

            $number = substr_compare($current, $last, strlen($current)-strlen($last), strlen($last),TRUE); // -1 because it starts at 0
            if($number == 0){
                $temp[] = $current; 
            }    
        }

    }
    update();

}




// checks if word can be formed
if($string != null){

    for($x=0; $x< strlen($string) ; $x++){
        
        $char = substr($string,$x,1); // gets current character at $x
        $exists = FALSE;
        
        for($i = 0; $i< sizeof($letters); $i++){ // loops through letter array
            if($letters[$i] == $char){  // checks if letter already exists
                $count[$i] = $count[$i] + 1; // if it exists, update count array
                $exists = TRUE;
            }    
        }
        
        if($exists == FALSE){
            $letters[] = $char;
            $count[] = 1;
        }
    }
    // array of letters and counts has been built


    // regex function \b[desert]+\b

    // builds regex function
    $pattern = "/\b[" . $string . "]+\b/";
    
    //runs the filter / match
    $temp = preg_grep($pattern, $main);
   //$temp = preg_grep_keys($pattern, $main, $flags = 0);
    /*
    print_r($temp);
    echo "letters<br>";
    print_r($letters);
    echo "count<br>";
    print_r($count);
    echo "<br>";
    */
    
    update();

        // need to check counts and remove stuff that can't be formed 
        // count how much of each letter there is 
        foreach ($main as &$cw) {
            
            $cw = (string)$cw;
            $cw = trim($cw);
            // creates wl and wc arrays
            for($x=0; $x< strlen($cw) ; $x++){

                    $char = substr($cw,$x,1); // gets current character at $x
                    $exists = FALSE;

                    for($i = 0; $i< sizeof($wl); $i++){ // loops through letter array
                        if($wl[$i] == $char){  // checks if letter already exists
                            $wc[$i] = $wc[$i] + 1; // if it exists, update count array
                            $exists = TRUE;
                        }    
                    }
                    if($exists == FALSE){
                        $wl[] = $char;
                        $wc[] = 1;
                    }
            }

            $possible = TRUE;
            
            //checks if arrays match
            for($x=0; $x< sizeof($wl) ; $x++){
                
                $index == null;
                $curChar = $wl[$x]; // sets curChar to the character it will compare counts for
                
                for($d = 0; $d < sizeof($letters); $d++){
                    if($letters[$d] == $curChar){
                        $index = $d;
                    }
                }
                //echo "wl:" . $x;
                //echo "letters:" . $d;
                
                // compare indexies
                    if($wc[$x] > $count[$index]){
                        $possible = FALSE;
                    }
                
            }
            unset($c); // break the reference with the last element
/*
            echo "<br>";
            echo $cw;
            echo ":";
            print_r($wl); 
            print_r($wc); 
*/
            
            // removes if necessary
            if($possible == FALSE){
                if (($key = array_search($cw, $main)) !== false) {
                    unset($main[$key]);
                }
            }
            $wl = array(); 
            $wc = array(); 
        }
        unset($current); // break the reference with the last element
    
}


echo implode(",", $main);
?>