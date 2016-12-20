/*Gandikota ramesh, Sujan    Account :  jadrn018 
            CS545, Fall 2015
            Project #4 */


var proj4_data;



$(document).ready(function() {
    proj4_data = new Array();
    var cart = new shopping_cart("jadrn018");
    $.get('/perl/jadrn018/proj4/get_products.cgi', storeData);

    $('#same_address').change(function(){
        if(document.getElementById('same_address').checked){
            document.getElementById('bill').style.display = "none";     
        }   
        else
        document.getElementById('bill').style.display = "block";
        })

    var errorStatusHandle = $('#message_line');
    var elementHandle = new Array(16);
    elementHandle[0] = $('[name="name"]');
    elementHandle[1] = $('[name="address"]');
    elementHandle[2] = $('[name="city"]');
    elementHandle[3] = $('[name="state"]');
    elementHandle[4] = $('[name="zip"]');
    elementHandle[5] = $('[name="phone"]');
    elementHandle[6] = $('[name="billing_name"]');
    elementHandle[7] = $('[name="billing_address"]');
    elementHandle[8] = $('[name="billing_city"]');
    elementHandle[9] = $('[name="billing_state"]');
    elementHandle[10] = $('[name="billing_zip"]');
    elementHandle[11] = $('[name="billing_phone"]');
    elementHandle[12] = $('[name="cnumber"]');
    elementHandle[13] = $('[name="ctype"]');
    elementHandle[14] = $('[name="month"]');
    elementHandle[15] = $('[name="year"]');
    
    function isValidData() {
        if(isEmpty(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter your name");
            elementHandle[0].focus();
            return false;
            }
        if(isEmpty(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter your address");
            elementHandle[1].focus();
            return false;
            }
        if(isEmpty(elementHandle[2].val())) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Please enter your city");
            elementHandle[2].focus();
            return false;
            }
         if(isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter your state");
            elementHandle[3].focus();
            return false;
            }
        if(!isValidState(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("The state appears to be invalid, "+
            "please use the two letter state abbreviation");
            elementHandle[3].focus();            
            return false;
            }
        if(isEmpty(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter your zip");
            elementHandle[4].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("The zipcode appears to be invalid, "+
            "numbers only please. ");
            elementHandle[4].focus();            
            return false;
            }
        if(elementHandle[4].val().length != 5) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("The zip code must have exactly five digits")
            elementHandle[4].focus();            
            return false;
            }
        if(isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter your phone");
            elementHandle[5].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("The phone number appears to be invalid, "+
            "numbers only please. ");
            elementHandle[5].focus();            
            return false;
            }
        if(elementHandle[5].val().length != 10) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("The phone number must have exactly 10 digits")
            elementHandle[5].focus();            
            return false;
            }
        if(isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter your name for billing");
            elementHandle[6].focus();
            return false;
            }
        if(isEmpty(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter your address for billing");
            elementHandle[7].focus();
            return false;
            }
        if(isEmpty(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter your city for billing");
            elementHandle[8].focus();
            return false;
            }
         if(isEmpty(elementHandle[9].val())) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("Please enter your state for billing");
            elementHandle[9].focus();
            return false;
            }
        if(!isValidState(elementHandle[9].val())) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("The state appears to be invalid, "+
            "please use the two letter state abbreviation");
            elementHandle[9].focus();            
            return false;
            }
        if(isEmpty(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please enter your zip for billing");
            elementHandle[10].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("The zipcode appears to be invalid, "+
            "numbers only please. ");
            elementHandle[10].focus();            
            return false;
            }
        if(elementHandle[10].val().length != 5) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("The zip code used for billing must have exactly five digits")
            elementHandle[10].focus();            
            return false;
            }
        if(isEmpty(elementHandle[11].val())) {
            elementHandle[11].addClass("error");
            errorStatusHandle.text("Please enter your phone for billing");
            elementHandle[11].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[11].val())) {
            elementHandle[11].addClass("error");
            errorStatusHandle.text("The phone number appears to be invalid, "+
            "numbers only please. ");
            elementHandle[11].focus();            
            return false;
            }
        if(elementHandle[11].val().length != 10) {
            elementHandle[11].addClass("error");
            errorStatusHandle.text("The phone number used for billing must have exactly 10 digits")
            elementHandle[11].focus();            
            return false;
            }
        if(isEmpty(elementHandle[12].val())) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Please enter your card details");
            elementHandle[12].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[12].val())) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("The card appears to be invalid, "+
            "numbers only please. ");
            elementHandle[12].focus();            
            return false;
            }
        if(elementHandle[12].val().length != 16) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("There should be exactly 16 digits")
            elementHandle[12].focus();            
            return false;
            }
        if(!$("input[name*='ctype']:checked").val()){
            elementHandle[13].addClass("error");
            errorStatusHandle.text("Please select Card type.");
            elementHandle[13].focus();            
            return false;
            }
        if(isEmpty(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Please enter Month");
            elementHandle[14].focus();            
            return false;
            }
        if(!$.isNumeric(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Please Enter number for month");
            elementHandle[14].focus();            
            return false;
            }
        if(elementHandle[14].val().length != 2) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("There should be exactly 2 digits")
            elementHandle[14].focus();            
            return false;
            }
        if(elementHandle[14].val() < "0") {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Month is invalid");
            elementHandle[14].focus();            
            return false;
            }
        if(elementHandle[14].val() > "12") {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Month is invalid");
            elementHandle[14].focus();            
            return false;
            }
        if(isEmpty(elementHandle[15].val())) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("Please enter Year");
            elementHandle[15].focus();            
            return false;
            }
        if(!$.isNumeric(elementHandle[15].val())) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("Please Enter year");
            elementHandle[15].focus();            
            return false;
            }
        if(elementHandle[15].val().length != 4) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("There should be exactly 4 digits")
            elementHandle[15].focus();            
            return false;
            }
        if(elementHandle[15].val() < "2015") {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("The card is expired. Use another card!")
            elementHandle[15].focus();            
            return false;
            }
        return true;
               
        }
        elementHandle[0].focus();


        elementHandle[3].on('keyup', function() {
        elementHandle[3].val(elementHandle[3].val().toUpperCase());
        });

        elementHandle[9].on('keyup', function() {
        elementHandle[9].val(elementHandle[9].val().toUpperCase());
        });

        $(':submit').on('click', function() {
        for(var i=0; i < 16; i++)
            elementHandle[i].removeClass("error");
            errorStatusHandle.text("");
             if(document.getElementById('same_address').checked){
            document.getElementById('billing_name').value= document.getElementById('name').value
            document.getElementById('billing_address').value=document.getElementById('address').value
            document.getElementById('billing_city').value=document.getElementById('city').value
            document.getElementById('billing_state').value=document.getElementById('state').value
            document.getElementById('billing_zip').value=document.getElementById('zip').value
            document.getElementById('billing_phone').value=document.getElementById('phone').value     
        }   
            return isValidData();
        });
        
    $(':reset').on('click', function() {
        for(var i=0; i < 16; i++)
            elementHandle[i].removeClass("error");
            errorStatusHandle.text("");
        });


    $('#dark').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Dark chocolate") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                for(var j=0; j < proj4_data[i].length; j++)
                    {  
                        if(j != 5)
                        tmpString += proj4_data[i][j] + "<br />";
                   }
                tmpString += "<input type='text'"+
                "class='buytext' id='" + proj4_data[i][0]+"_text' />";
                tmpString += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmpString += "<span>Added to Cart</span><br /><hr /><br />";

                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        })
        
    $('#nuts').on('click', function() {   
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Nuts and chews") {  
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";                     
                for(var j=0; j < proj4_data[i].length; j++)
                    {  
                        if(j != 5)
                        tmpString += proj4_data[i][j] + "<br />";
                   }
                tmpString += "<input type='text'"+
                "class='buytext' id='" + proj4_data[i][0]+"_text' />";
                tmpString += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
                tmpString += "<span>Added to Cart</span><br /><hr /><br />";                
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        }) 
        
    $('#brittle').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Brittles and toffies") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                for(var j=0; j < proj4_data[i].length; j++)
                    {  
                        if(j != 5)
                        tmpString += proj4_data[i][j] + "<br />";
                   }
                tmpString += "<input type='text'"+
                "class='buytext' id='" + proj4_data[i][0]+"_text' />";
                tmpString += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
                tmpString += "<span>Added to Cart</span><br /><hr /><br />";                
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        })  

        $('#milk').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Milk chocolate") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                for(var j=0; j < proj4_data[i].length; j++)
                    {  
                        if(j != 5)
                        tmpString += proj4_data[i][j] + "<br />";
                   }
                tmpString += "<input type='text'"+
                "class='buytext' id='" + proj4_data[i][0]+"_text' />";
                tmpString += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
                tmpString += "<span>Added to Cart</span><br /><hr /><br />";                
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        }) 

         $('#truffles').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Truffles") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                for(var j=0; j < proj4_data[i].length; j++)
                    {  
                        if(j != 5)
                        tmpString += proj4_data[i][j] + "<br />";
                   }
                    tmpString += "<input type='text'"+
                    "class='buytext' id='" + proj4_data[i][0]+"_text' />";
                    tmpString += "<input type='button' value='Add To Cart'"+
                    "class='buy' id='" + proj4_data[i][0]+"' />";
                    tmpString += "<span>Added to Cart</span><br /><hr /><br />";                
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        }) 

         $('#gifts').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Gifts") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                for(var j=0; j < proj4_data[i].length; j++)
                    {  
                        if(j != 5)
                        tmpString += proj4_data[i][j] + "<br />";
                   }
                    tmpString += "<input type='text'"+
                    "class='buytext' id='" + proj4_data[i][0]+"_text' />";
                    tmpString += "<input type='button' value='Add To Cart'"+
                    "class='buy' id='" + proj4_data[i][0]+"' />";
                    tmpString += "<span>Added to Cart</span><br /><hr /><br />";                
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        }) 

         $('#holiday').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) { 
            if(proj4_data[i][1] == "Holiday assortments") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                for(var j=0; j < proj4_data[i].length; j++)
                    {  
                        if(j != 5)
                        tmpString += proj4_data[i][j] + "<br />";
                   }
                    tmpString += "<input type='text'"+
                    "class='buytext' id='" + proj4_data[i][0]+"_text' />";
                    tmpString += "<input type='button' value='Add To Cart'"+
                  "class='buy' id='" + proj4_data[i][0]+"' />";
                    tmpString += "<span>Added to Cart</span><br /><hr /><br />";                
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        })  

        $('#choc_cart').on('click', function() {
  			updateDisplay();
        })   

         $(document).on('click','.delete', function() {
         	var sku = this.id;
         	
        cart.delete(sku);
        updateDisplay();
        });   

         $( "#dialog-modal" ).dialog({
            height: 350,
            width: 500,
            modal: true,
            autoOpen: false
    });
    
    $(document).on('click','#order_button', function($e) {    
       
            $("#dialog-modal").dialog('open');
            });


        
    $(document).on('click', ".buy", function() {  
        var sku = this.id;
        var s_value = "#"+sku+"_text";
        var value = $(s_value).val();
        var item_cost;
        for(var i=0; i < proj4_data.length; i++){
            if(proj4_data[i][0] == sku)
                item_cost = proj4_data[i][6] * value;
        }
        if($.isNumeric(parseInt(value))==true){
        cart.add(sku,value,item_cost);
        //cart.add(sku,1);
        $(this).next().fadeIn(50).fadeOut(2000);
    }
        }); 



    $(document).on('click', ".update", function() {  
        var sku = this.id;
        var s_value = "#"+sku+"_text";
        var value = $(s_value).val();
        var item_cost;
        for(var i=0; i < proj4_data.length; i++){
            if(proj4_data[i][0] == sku)
                item_cost = proj4_data[i][6] * value;
        }
        cart.setQuantity(sku,value,item_cost);
        updateDisplay();
        //cart.add(sku,1);
        $(this).next().fadeIn(50).fadeOut(2000);
        }); 




        function updateDisplay() {
            var cartArray = cart.getCartArray();
            var toWrite = "<table id='shop_cart'>";
            toWrite += "<tr><th class='shop_style'>SKU</th><th class='shop_style'>Quantity</th><th class='shop_style'>Price</th></tr>";
            var total = 0;
            var tax = .08;
            var shipping = 2;

            for(i=0; i < cartArray.length; i++) {
                var final_value = parseFloat(cartArray[i][2]).toFixed(2);
                toWrite += "<tr>";
                toWrite += "<td>"+cartArray[i][0]+"</td>";
                toWrite += "<td>"+"<input type='text' value='"+cartArray[i][1]+"' id='"+cartArray[i][0]+"_text' /></td>";
                toWrite += "<td>$"+final_value+"</td>";
                toWrite += "<td class = 'table_data'>"+"<input type='button' value='Delete' class='delete' id='"+cartArray[i][0]+"' /></td>";
                toWrite += "<td class = 'table_data'>"+"<input type='button' value='Update Quantity' class='update' id='"+cartArray[i][0]+"' /></td>";
                toWrite += "</tr>";
                total += parseFloat(cartArray[i][2]);
                }

            if(cartArray.length!=0){
            var tax_price = total * tax;
            var totalPrice = total + shipping + tax_price;
            toWrite += "<tr>";
            toWrite += "<td class = 'table_data'></td>";
            toWrite += "<td>Tax Price</td>";
            toWrite += "<td>$"+tax_price.toFixed(2)+"</td>";
            toWrite += "</tr>";
            toWrite += "<tr>";
            toWrite += "<td class = 'table_data'></td>";
            toWrite += "<td>Shipping Price</td>";
            toWrite += "<td>$"+shipping.toFixed(2)+"</td>";
            toWrite += "</tr>";
            toWrite += "<tr>";
            toWrite += "<td class = 'table_data'></td>";
            toWrite += "<td>total</td>";
            toWrite += "<td>$"+totalPrice.toFixed(2)+"</td>";
            toWrite += "</tr>";
            toWrite += "<tr>";
            toWrite += "<td></td><td></td>";
            toWrite += "<td><input type='button' value='Order Now' id='order_button' /></td>";
            toWrite += "</tr>";
            }
            else{
            toWrite += "<tr>";
            toWrite += "<td>Your cart is empty!</td>";
            
            toWrite += "</tr>"; 
            }
            toWrite += "</table>";
            
            var handle = document.getElementById('content');
            handle.innerHTML = toWrite;    
            }     
        
                    
        });    

    
    function storeData(response) {
        var tmpArray = explodeArray(response,';');
        for(var i=0; i < tmpArray.length; i++) {
            innerArray = explodeArray(tmpArray[i],'|');
            proj4_data[i] = innerArray;
        }
    }
    
    
    function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        }
    
    function isValidState(state) {                                
        var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
        "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
        "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
        "UT","VA","VT","WA","WI","WV","WY");
        for(var i=0; i < stateList.length; i++) 
            if(stateList[i] == $.trim(state))
                return true;
        return false;
        }
  

      
    function explodeArray(item,delimiter) {
        tempArray=new Array(1);
        var Count=0;
        var tempString=new String(item);

        while (tempString.indexOf(delimiter)>0) {
            tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
            tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
            Count=Count+1
        }
        tempArray[Count]=tempString;
        return tempArray;
        }

    function shopping_cart(owner) {
        this.owner = $.trim(owner);
        this.skuArray = new Array();
        this.qtyArray = new Array();
        this.price_array = new Array();


        this.getCookieValues = function() {  // PRIVATE METHOD
            var raw_string = document.cookie;        
            var arr = new Array();
                if(raw_string == undefined)
                    return;
            var tmp = raw_string.split(";");
            var myValue = null;        
            for(i=0; i < tmp.length; i++)
                if(tmp[i].indexOf(owner) != -1)
                    myValue = tmp[i].split("=");
                if(!myValue)
                    return;
                arr = myValue[1].split("||");
            for(i=0; i < arr.length; i++) {
                var pair = arr[i].split("|"); 
            if(pair[0] == undefined || pair[1] == undefined || pair[2] == undefined) continue;
                this.skuArray[i] = pair[0];
                this.qtyArray[i] = pair[1];
                this.price_array[i] = pair[2];
            }         
        }
        
        this.writeCookie = function() {  // PRIVATE METHOD
        var toWrite = this.owner+"=";
        for(i=0; i < this.skuArray.length; i++) 
            toWrite += this.skuArray[i] + "|" + this.qtyArray[i] + "|" + this.price_array[i] + "||";
        toWrite = toWrite.substring(0,toWrite.length - 2);
        toWrite += "; path=/";
        document.cookie = toWrite;
        }
    
        
    this.add = function(sku, quantity,item_cost) {
        sku = $.trim(sku);
        quantity = $.trim(quantity);
        item_cost = $.trim(item_cost);
        this.getCookieValues(); 
        var found = false;
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku) {        
            this.qtyArray[i] = parseInt(quantity,10) + parseInt(this.qtyArray[i],10);
            this.price_array[i] = parseFloat(item_cost,10) + parseFloat(this.price_array[i],10);
            found = true;            
            }
        if(!found) {       
            this.skuArray.push(sku);
            this.qtyArray.push(quantity);
            this.price_array.push(item_cost);
            }
        this.writeCookie();         
    }
    
    this.setQuantity = function(sku, quantity, item_cost) {  
        sku = $.trim(sku);
        var found = false;
        if(sku == "") return;        
        quantity = $.trim(quantity); 
        item_cost = $.trim(item_cost);           
        this.getCookieValues();
        
        for(i=0; i < this.skuArray.length; i++)
            if(this.skuArray[i] == sku) {        
                this.qtyArray[i] = parseInt(quantity,10);
                this.price_array[i] = parseFloat(item_cost,10);            
                found = true;
                }
        if(found)
            this.writeCookie();
        }    
    
    this.delete = function(sku) {
    	
        sku = $.trim(sku);
        var index = -1;
        this.getCookieValues();       
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku)  
            index = i;               
        if(index != -1) {      
            this.skuArray.splice(index,1);
            this.qtyArray.splice(index,1);
            }         
        if(this.skuArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1;path=/";
            }
        else
            this.writeCookie();
        }
        
    this.size = function() {
        this.getCookieValues();
        var count = 0;
        for(i=0; i < this.qtyArray.length; i++)
            count += parseInt(this.qtyArray[i],10);
        return count;
        }        
        
    this.getCartArray = function() {
        this.getCookieValues();
        var returnArray = new Array();
        for(i=0; i < this.skuArray.length; i++) {
            returnArray[i] = new Array();
            returnArray[i].push(this.skuArray[i]);
            returnArray[i].push(this.qtyArray[i]);
            returnArray[i].push(this.price_array[i]);
            }
        return returnArray;
        }                    
  
}