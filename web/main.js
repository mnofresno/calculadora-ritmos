var VM = function()
{
    var self = this;
    
    self.incluirPermutaciones    = ko.observable(false);
    self.numeroValor             = ko.observable();
    self.permutacionesCalculadas = ko.observable('');
    self.loading                 = ko.observable(false);
    self.cantidadResultados      = ko.observable(0);

    var process = {
        true: getAllIncludingPermutedCombinationsThatSum,
        false: getCombinationsThatSum
    };    
    
    self.enableCalcular = ko.pureComputed(function()
    {
        return !self.loading() && parseInt(self.numeroValor()) > 0;
    });

    self.calcular = function()
    {
        self.loading(true);
        setTimeout(function() {
            var ritmos = process[self.incluirPermutaciones()](self.numeroValor());
            var ritmosHtml = "";
            ritmosHtml = _.map(ritmos, function(ritmo)
            {
                return ritmo;
            }).join("\r\n");
            
            self.cantidadResultados(ritmos.length);
            self.permutacionesCalculadas(ritmosHtml);
            self.loading(false);
        }, 100);
    };
    
    return self;
};


$(document).ready(function()
{
    ko.applyBindings(new VM());
});