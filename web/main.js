var VM = function()
{
    var self = this;
    
    self.incluirPermutaciones    = ko.observable(false);
    self.numeroValor             = ko.observable();
    self.permutacionesCalculadas = ko.observable('');
    
    var process = {
        true: getAllIncludingPermutedCombinationsThatSum,
        false: getCombinationsThatSum
    };    
    
    self.calcular = function()
    {
        var ritmos = process[self.incluirPermutaciones()](self.numeroValor());
        var ritmosHtml = "";
        ritmosHtml = _.map(ritmos, function(ritmo)
        {
            return ritmo;
        }).join("\r\n");
        
        self.permutacionesCalculadas(ritmosHtml);
    };
    
    return self;
};


$(document).ready(function()
{
    ko.applyBindings(new VM());
});