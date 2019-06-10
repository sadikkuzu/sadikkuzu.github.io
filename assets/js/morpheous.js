var myname = "SADIK KUZU"
$('#morpheous').html(myname);
var ayrac = 0;
//interval milisaniyerli
var hover_spinInterval = 20;
var hover_mpinInterval = 300;
var taklayaBasla_spinInterval = 20;
var taklayaBasla_mpinInterval = 200;

function rnum(string_length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnoprstuvwxyz";
    var randomstring = elm.html().substring(0, ayrac);
    for(var i=ayrac; i<string_length; i++) {
        var rn = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rn, rn+1);
    }
    return randomstring;
}

function rword() {
    var len = elm.html().length;
    elm.html(rnum(len));
}

function ayracArttir() {
    if(ayrac<elm.html().length)
    {
        ayrac++;
    }
    else
    {
        clearInterval(spin);
        clearInterval(mpin);
        ayrac = 0;
    }
    elm.html(old);
}

function taklayaBasla(morfi, spinInterval, mpinInterval) {
    elm = $(morfi);
    old = elm.html();
    spin = setInterval("rword()", spinInterval);
    mpin = setInterval("ayracArttir()", mpinInterval);
}

$('#morpheous').hover(
        function() {
            clearInterval(spin);
            clearInterval(mpin);
            old = myname;
            elm = $(this);
            elm.html(old);
            spin = setInterval("rword()", hover_spinInterval);
            mpin = setInterval("ayracArttir()", hover_mpinInterval);
        
        },
        function() {
            clearInterval(spin);
            clearInterval(mpin);
            $(this).html(myname);
            ayrac = 0;
        }
    );

taklayaBasla('#morpheous', taklayaBasla_spinInterval, taklayaBasla_mpinInterval);