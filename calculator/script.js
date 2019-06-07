
        let pwr = true; 
        display = document.querySelector('#equation-display');
        let displayEmpty = true;
        allButtons = document.querySelectorAll('[button]'); 
        allButtons = Array.from(allButtons); 
        const container = document.querySelector('#container');

        //listener for any buttons being clicked 
        for (count = 0; count < allButtons.length; count++) 
        {
            allButtons[count].addEventListener('click', buttonToDisplay);
        }

        //sends the values of buttons that are clicked to the display 
        function buttonToDisplay(e) 
        {
            buttonTxt = e.target.textContent;
            if (displayEmpty && pwr == true) 
            {
                display.textContent = buttonTxt;
                displayEmpty = false;
            }
            else if(pwr == true)
            {
                display.textContent += buttonTxt;
            }
        }

        //clears the display 
        function clearDisplay() 
        {
            if(pwr == true)
            {
                display.textContent = '0';
                displayEmpty = true;
            }
        }

        clearButton = document.querySelector('#clear');
        clearButton.removeEventListener('click', buttonToDisplay);
        clearButton.addEventListener('click', clearDisplay);

        //turns the power on or off 
        function pwrButton()
        {
            if(displayEmpty == false || display.textContent == '0')
            {
                display.innerHTML = '&nbsp'; 
                displayEmpty = true; 
                pwr = false; 
            }
            else
            {
                pwr = true; 
                clearDisplay(); 
            }
        }

        powerButton = document.querySelector('#power');
        powerButton.removeEventListener('click', buttonToDisplay);
        powerButton.addEventListener('click', pwrButton);

        //deletes text from the display one char at a time - resets back to 0 when everything is deleted 
        function backspace() 
        {
            if (display.textContent.length == 1 && pwr == true) 
            {
                display.textContent = '0';
                displayEmpty = true;
            }
            else if(pwr == true)
            {
                display.textContent = display.textContent.slice(0, -1);
            }
        }

        deleteButton = document.querySelector('#delete');
        deleteButton.removeEventListener('click', buttonToDisplay);
        deleteButton.addEventListener('click', backspace);

        //adds two numbers together 
        function add(a, b) 
        {
            var num1 = parseFloat(a);
            var num2 = parseFloat(b);

            return (num1 + num2).toFixed(2);
        }

        //subtracts two numbers 
        function subtract(a, b) 
        {
            var num1 = parseFloat(a);
            var num2 = parseFloat(b);

            return (num1 - num2).toFixed(2);
        }

        //multiplies two numbers 
        function multiply(a, b) 
        {
            var num1 = parseFloat(a);
            var num2 = parseFloat(b);

            return (num1 * num2).toFixed(2);
        }

        //divides two numbers 
        function divide(a, b) 
        {
            var num1 = parseFloat(a);
            var num2 = parseFloat(b);

            if (num2 === 0) 
            {
                error = "ERR";
                return error; 
            }
            else
            {
                return (num1 / num2).toFixed(2);
            }
        }

        //calls the correct math function depending on what operator it is given 
        function operate(num1, operator, num2) 
        {
            if (operator === '+') 
            {
                result = add(num1, num2);
                return result;
            }
            else if (operator === '-') 
            {
                result = subtract(num1, num2);
                return result;
            }
            else if (operator === '*') 
            {
                result = multiply(num1, num2);
                return result;
            }
            else 
            {
                result = divide(num1, num2);
                return result;
            }
        }

        //tests to see if a char is one of the four operators, returns a bool value 
        function isOperator(test)
        {
            if(test == '+' || test == '-' || test == '*' || test == '/')
            {
                return true;
            }
            else
            {
                return false; 
            }
        }

        //function called when the equal sign button is pressed 
        function equals() 
        {
            if(pwr == true)
            {
                //turns the current display text into an array and then loops through in order to combine separate digits that are next to each other into whole numbers 
                equation = display.textContent;
                size = equation.length - 1;
                equationArray = Array.from(equation);
                for(count = 0; count < size; count++)
                {
                    current = equationArray[count];
                    next = equationArray[count+1];
                    if(!isOperator(current))
                    {
                        if(!isOperator(next))
                        {
                            newNum = current + next
                            equationArray[count] = null;
                            equationArray[count+1] = newNum; 
                        }
                    }
                }

                //places any numbers/operators from the current array into a new one in order to weed out the null values 
                newSize = equationArray.length;
                pos = 0;
                var newArray = []; 
                for(count = 0; count < newSize; count++)
                {
                    current = equationArray[count];
                    {
                        if(current !== null)
                        {
                            newArray[pos] = current; 
                            pos++; 
                        }
                    }
                }

                //loops through the new array, calling upon the operate function when two values and an operator are found then displays the final result 
                newestSize = newArray.length;   
                for (count = 0; count < newestSize; count++) 
                {
                    if (newArray[count] === '+') 
                    {
                        num1 = newArray[count - 1];
                        num2 = newArray[count + 1];
                        sum = operate(num1, '+', num2);
                        newArray[count + 1] = sum;
                    }
                    else if (newArray[count] === '-') 
                    {
                        num1 = newArray[count - 1];
                        num2 = newArray[count + 1];
                        difference = operate(num1, '-', num2);
                        newArray[count + 1] = difference;
                    }
                    else if (newArray[count] === '*') 
                    {
                        num1 = newArray[count - 1];
                        num2 = newArray[count + 1];
                        product = operate(num1, '*', num2);
                        newArray[count + 1] = product;
                    }
                    else if (newArray[count] === '/') 
                    {
                        num1 = newArray[count - 1];
                        num2 = newArray[count + 1];
                        dividend = operate(num1, '/', num2);
                        newArray[count + 1] = dividend;
                    }
                }

                result = newArray[newestSize-1];
                display.textContent = result;
                displayEmpty = false;
            }
        }
        equalsButton = document.querySelector('#equals');
        equalsButton.removeEventListener('click', buttonToDisplay);
        equalsButton.addEventListener('click', equals);