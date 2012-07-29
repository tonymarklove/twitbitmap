var d3Render = null;

jQuery(function($) {
  var width = 960,
      height = 500,
      color = d3.scale.category20c();

  var treemap = d3.layout.treemap()
      .size([width, height])
      // .sticky(true)
      .value(function(d) { return d.size; });

  var div = d3.select("#chart").append("div")
      .style("position", "relative")
      .style("width", width + "px")
      .style("height", height + "px");

  d3Render = function(json) {
    var images = div.data([{name: "test", children: json}]).selectAll("div")
        .data(treemap.nodes, function(d) { return d.url; });

    images.enter()
      .append("div")
      .attr("class", "cell")
      .property("title", function(d) { return d.caption; });

    images
      .transition()
      .duration(1500)
      .call(cell);

    images.exit()
      .transition()
      .duration(1500)
      .call(removeCell)
      .remove();
  };

  function cell() {
    this
        .style("background-image", function(d) { return d.url ? "url(" + d.url + ")" : ""; })
        .style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
  }

  function removeCell() {
    this
      .style("opacity", 0);
  }

  initPusher();

  // $(".cell").live("click", function() {
  //   $(this).CreateBubblePopup({innerHtml: 'This is a Bubble Popup!', manageMouseEvents: false});
  //   $(this).ShowBubblePopup({innerHtml: 'This is a Bubble Popup!'});
  //   $(this).FreezeBubblePopup();
  // });

  $("#chart").click(function(e) {
    var cell = $(e.target).closest(".cell");

    if (!cell) {
      return;
    }

    var image = cell.css("background-image").replace(/^url|[\(\)\"\']/g, '');
    jQuery.slimbox(image, cell.attr("title"));
  });



  // Setup fake data
  var fakeData = [
    [
      /// ================ Data 1
      {
        "caption":"24 hours to London 2012! Woohooo! #olympics",
        "created_at":"2012-07-28T19:47:46Z",
        "id":1,
        "size":691,
        "updated_at":"2012-07-28T19:47:46Z",
        "url":"http://distilleryimage0.instagram.com/b35a0ad6d75b11e197d41231381b585f_7.jpg"
      },
      {
        "caption":"I hate her entire camp. Bunch of yes men & women. Smh.",
        "created_at":"2012-07-28T20:00:29Z",
        "id":4,
        "size":152,
        "updated_at":"2012-07-28T20:00:29Z",
        "url":"http://distilleryimage5.instagram.com/c783ce4ad8e411e1bacf1231380f8dc9_7.jpg"
      },
      {
        "caption":"400 meters swimming! My first Olympic event!",
        "created_at":"2012-07-28T19:47:58Z",
        "id":2,
        "size":20,
        "updated_at":"2012-07-28T19:48:33Z",
        "url":"http://distilleryimage0.instagram.com/666764fed8e511e197d41231381b585f_7.jpg"
      },
      {
        "caption":"The new Australian #olympic swim team mascot!! #aquatics2012",
        "created_at":"2012-07-28T20:07:15Z",
        "id":36,
        "size":5,
        "updated_at":"2012-07-28T20:07:15Z",
        "url":"http://distilleryimage6.instagram.com/bc71fa32d8d411e1b62722000a1e8b36_7.jpg"
      },
      {
        "caption":"Frases Olímpicas ","created_at":"2012-07-28T20:05:19Z",
        "id":24,
        "size":3,
        "updated_at":"2012-07-28T20:05:19Z",
        "url":"http://distilleryimage10.instagram.com/771c0ad0d8e911e186531231380ff997_7.jpg"
      },
      {
        "caption":"Southbank #tourist #london #wolfpack",
        "created_at":"2012-07-28T20:00:43Z",
        "id":5,
        "size":1,
        "updated_at":"2012-07-28T20:00:43Z",
        "url":"http://distilleryimage7.s3.amazonaws.com/91f1bfaad75711e19ed51231381000d3_7.jpg"
      },
      {
        "caption":"And they said arsenal has gone 7 years without a trophy still have more trophies than all London teams ------>",
        "created_at":"2012-07-28T20:04:57Z",
        "id":20,
        "size":1,
        "updated_at":"2012-07-28T20:04:57Z",
        "url":"http://distilleryimage7.s3.amazonaws.com/ab875b0ad5e511e1a7ed22000a1e88b3_7.jpg"
      },
      {
        "caption":"#TeamPoly #Samoa #London #Olympics #2012 # #Fa'aSAMOA!!!!",
        "created_at":"2012-07-28T20:05:25Z",
        "id":25,
        "size":1,
        "updated_at":"2012-07-28T20:05:25Z",
        "url":"http://distilleryimage10.instagram.com/86555f66d8d911e1968822000a1e8bae_7.jpg"
      },
      {
        "caption":"Italia, terra di santi, porti, navigatori e fiorettiste #SkyOlimpiadi",
        "created_at":"2012-07-28T20:00:26Z",
        "id":3,
        "size":0,
        "updated_at":"2012-07-28T20:00:26Z",
        "url":"http://distilleryimage6.instagram.com/889bc9eed8ee11e1b56922000a1c8802_7.jpg"
      },
      {
        "caption":"Review of London's Olympic app. Someone doesn't realize UK spelling is different than US spelling. #SpelllcheckFail",
        "created_at":"2012-07-28T20:00:44Z",
        "id":6,
        "size":0,
        "updated_at":"2012-07-28T20:00:44Z",
        "url":"http://distilleryimage1.instagram.com/6999ee86d8ee11e1a76e22000a1e8903_7.jpg"
      },
    ],
    [
      /// ================ Data 2

      {
        "caption":"24 hours to London 2012! Woohooo! #olympics",
        "created_at":"2012-07-28T19:47:46Z",
        "id":1,
        "size":100,
        "updated_at":"2012-07-28T19:47:46Z",
        "url":"http://distilleryimage0.instagram.com/b35a0ad6d75b11e197d41231381b585f_7.jpg"
      },
      {
        "caption":"400 meters swimming! My first Olympic event!",
        "created_at":"2012-07-28T19:47:58Z",
        "id":2,
        "size":50,
        "updated_at":"2012-07-28T19:48:33Z",
        "url":"http://distilleryimage0.instagram.com/666764fed8e511e197d41231381b585f_7.jpg"
      },
      {
        "caption":"The new Australian #olympic swim team mascot!! #aquatics2012",
        "created_at":"2012-07-28T20:07:15Z",
        "id":36,
        "size":25,
        "updated_at":"2012-07-28T20:07:15Z",
        "url":"http://distilleryimage6.instagram.com/bc71fa32d8d411e1b62722000a1e8b36_7.jpg"
      },
      {
        "caption":"Frases Olímpicas ","created_at":"2012-07-28T20:05:19Z",
        "id":24,
        "size":12,
        "updated_at":"2012-07-28T20:05:19Z",
        "url":"http://distilleryimage10.instagram.com/771c0ad0d8e911e186531231380ff997_7.jpg"
      },
      {
        "caption":"Southbank #tourist #london #wolfpack",
        "created_at":"2012-07-28T20:00:43Z",
        "id":5,
        "size":8,
        "updated_at":"2012-07-28T20:00:43Z",
        "url":"http://distilleryimage7.s3.amazonaws.com/91f1bfaad75711e19ed51231381000d3_7.jpg"
      },
      {
        "caption":"And they said arsenal has gone 7 years without a trophy still have more trophies than all London teams ------>",
        "created_at":"2012-07-28T20:04:57Z",
        "id":20,
        "size":4,
        "updated_at":"2012-07-28T20:04:57Z",
        "url":"http://distilleryimage7.s3.amazonaws.com/ab875b0ad5e511e1a7ed22000a1e88b3_7.jpg"
      },
      {
        "caption":"#TeamPoly #Samoa #London #Olympics #2012 # #Fa'aSAMOA!!!!",
        "created_at":"2012-07-28T20:05:25Z",
        "id":25,
        "size":3,
        "updated_at":"2012-07-28T20:05:25Z",
        "url":"http://distilleryimage10.instagram.com/86555f66d8d911e1968822000a1e8bae_7.jpg"
      },
      {
        "caption":"Italia, terra di santi, porti, navigatori e fiorettiste #SkyOlimpiadi",
        "created_at":"2012-07-28T20:00:26Z",
        "id":3,
        "size":2,
        "updated_at":"2012-07-28T20:00:26Z",
        "url":"http://distilleryimage6.instagram.com/889bc9eed8ee11e1b56922000a1c8802_7.jpg"
      },
      {
        "caption":"Review of London's Olympic app. Someone doesn't realize UK spelling is different than US spelling. #SpelllcheckFail",
        "created_at":"2012-07-28T20:00:44Z",
        "id":6,
        "size":1,
        "updated_at":"2012-07-28T20:00:44Z",
        "url":"http://distilleryimage1.instagram.com/6999ee86d8ee11e1a76e22000a1e8903_7.jpg"
      }
    ]
  ];

/*
  var fakeDataIndex = 0;


  setInterval(function() {
    if (d3Render) {
      d3Render(fakeData[fakeDataIndex]);
    }

    fakeDataIndex++;

    if (fakeDataIndex >= fakeData.length) {
      fakeDataIndex = 0;
    }
  }, 5000);
*/
});
