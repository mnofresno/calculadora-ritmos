var process = {
    true: getAllIncludingPermutedCombinationsThatSum,
    false: getCombinationsThatSum
};

$(document).ready(function()
{
    var numeroInput   = $("#numero");
    var calcular      = $("#botonCalcular");
    var output        = $("#output");
    var permutaciones = $('#permutaciones');
    calcular.click(function()
    {
        var incluirPermutaciones = permutaciones.is(":checked");
        var numeroValor = numeroInput.val();
        var ritmos = process[incluirPermutaciones](numeroValor);
        var ritmosHtml = "";
        ritmosHtml = _.map(ritmos, function(ritmo)
        {
            return ritmo;
        }).join("<br />");
        
        output.html(ritmosHtml);
    });
});