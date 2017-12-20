var app = angular.module('dataApp', ['ngSanitize']);
app.controller('DataCtrl', function($scope,$sce) {
    var self = this;
    self.data = null;
    self.itemDetail = null;
    self.items = "";
    self.initShulfe = function(){
        /* reshuffle when user clicks a filter item */
        $('#filter a').click(function (e) {
            e.preventDefault();

            // set active class
            $('#filter a').removeClass('active');
            $(this).addClass('active');

            // get group name from clicked item
            var groupName = $(this).attr('data-group');

            /* initialize shuffle plugin */
            var $grid = $('#grid');

            $grid.shuffle({
                itemSelector: '.portfolio-item' // the selector for the items in the grid
            });
            // reshuffle grid
            $grid.shuffle('shuffle', groupName );
        });
    };
    self.init = function(){
    	self.data = pfData;
        var colors = ['#42115D','#0572C6','#D03638','#137513',
                    '#FEC418','#00863F','#75C147','#1F92D1'];
    	for(var i=0;i<pfData.length;i++){
    		pfData[i].type = pfData[i].type.split(",");
            var types = "";
            for(var j=0;j<pfData[i].type.length;j++){
                if(j==0){
                    types += "\"" + pfData[i].type[j] + "\"";
                }else{
                    types += ",\"" + pfData[i].type[j] + "\"";
                }
            }
            self.items += "<div data-groups='["+types+"]' class='portfolio-item col-xs-12 col-sm-6 col-md-3 shuffle-item filtered animated' style='margin:0; padding:0;'>";
            self.items += "<div class='portfolio'>";
            self.items += "<figure class='effect-julia' style='text-align:center;background-color: "+colors[i%8]+";'>";
            self.items += "<div style='width:100%; height:200px;'></div>";
            self.items += "<div style='position: absolute; width: 100%; top: 40%; margin: auto; text-align:center; font-size: 22px; color: #ffffff;'>"+pfData[i].title+"</div>";
            self.items += "<a data-toggle='modal' data-target='#infoModal' href='' onclick='showItem("+i+");'>";
            self.items += "<figcaption>";
            if(i%2==0){
                self.items += "<div class='move-up'>";
            }else{
                self.items += "<div class='move-down'>";
            }
            self.items += "<p>"+pfData[i].title+"</p>";
            self.items += "<strong>"+pfData[i].comment+"</strong>";
            self.items += "</div>";
            self.items += "</figcaption>";
            self.items += "</a>";
            self.items += "</figure>";
            self.items += "</div>";
            self.items += "</div>";
    	}
        self.items = $sce.trustAsHtml(self.items);
        self.initShulfe();
    };
    self.init();

    $scope.showItem = function(n){
        var item = pfData[n];
    	self.itemDetail = {
    		title: item.title,
    		comment: item.comment,
    		materialPrice: item.materialPrice,
            methodPrice: item.methodPrice,
            code: item.code
    	};
    };
});

function showItem(n){
    var appElement = document.querySelector('[ng-controller="DataCtrl as ctl"]');
    var $scope = angular.element(appElement).scope();
    $scope.showItem(n);
    $scope.$apply();
}