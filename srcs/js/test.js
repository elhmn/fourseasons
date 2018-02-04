function keyHandlerTest (event)
{
    var code = event.key;
    console.log(code);
    switch (code)
    {
		case "Backspace":
			document.removeEventListener ('keyup', keyHandlerTest, true);
			reloadMenu ();
			break;

        default:
            console.log("key unhandled");
            break;
    }
}

function tests ()
{
	console.log ("OOOKKKKK");
	document.addEventListener('keyup', keyHandlerTest, true);
}