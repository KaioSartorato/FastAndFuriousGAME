function start() {
	//Area Divs
	$('#start').hide();
	$('#gameover').hide();
	$('#vitoria').hide();
	$('#area_jogo').append("<div id='carrinho' class='carrinho'></div>");
	$('#area_jogo').append("<div id='policial' class='policial'></div>");
	$('#area_jogo').append("<div id='onibus' class='onibus'></div>");
	$('#area_jogo').append("<div id='taxi' class='taxi'></div>");
	$('#area_jogo').append("<div id='caminhao' class='caminhao'></div>");
	$('#area_jogo').append("<div id='moeda' class='moeda'></div>");
	$('#area_jogo').append("<div id='pessoa' class='pessoa'></div>");
	$('#area_jogo').append("<div id='vida_carrinho' class='vida'></div>");
	$('#area_jogo').append("<div id='pontuacao' class='pontos'>Pontos: </div>");
	
	//Variaveis globais
	var carrinho_local = 0;
	var tecla = {
		C:38,
		B:40,
		E:37,
		D:39
	}
	var jogo = {}
	jogo.pressionou = [];
	var vida = 4;
	var pontos = 0;
	var invencivel = false;
	var ultimoMultiploVerificado = 0;
	var velocidade = 10;
	var sangue = null;
	var vitoria_alcancada = false;

	nasce_policial();
	nasce_onibus();
	nasce_taxi();
    nasce_caminhao();
    nasce_moeda();
	nasce_pessoa();
    
	
	//Teclas pressionadas
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});


	$(document).keyup(function(e){
	   jogo.pressionou[e.which] = false;
	});	

	//Sons
	var somjogo=document.getElementById("somjogo");
	var salva=document.getElementById("salva");
	var coin=document.getElementById("coin");
	var explode=document.getElementById("explode");
	var victory=document.getElementById("victory");
	
	//Motor do jogo
	setInterval(loop,30);

	function loop() {
		somjogo.addEventListener("ended", function(){ somjogo.currentTime = 0; somjogo.play(); }, false);
		somjogo.play();
		movimentacenario();
		movimentacarrinho();
		movimentapolicial();
		movimentataxi();
		movimentaonibus();
		movimentacaminhao();
		verificaPontuacao();
		movimentamoeda();
		movimentasangue();
		movimentapessoa();
		mostrapontos();
		colisao();
	}
	
	function movimentacenario() {
        var posicao = parseInt($('.area_jogo').css("background-position-y"));
        $('.area_jogo').css("background-position-y", (posicao + velocidade) + "px");
    }

	function movimentasangue() {
        if (sangue) {
            var top = parseInt($(sangue).css("top"));
            $(sangue).css("top", top + velocidade);
            if (top >= 600) {
                $(sangue).remove();
                sangue = null;
            }
        }
    }
	
	function movimentacarrinho() {
		if ($('#gameover').is(':visible')) {
			return;
		}
		if(jogo.pressionou[tecla.D]){
			var left = parseInt($('#carrinho').css("left"));
			$('#carrinho').css("left", left+20);
			if(left>=500)
				$('#carrinho').css("left", 500);
		}

		if(jogo.pressionou[tecla.E]){
			var left = parseInt($('#carrinho').css("left"));
			$('#carrinho').css("left", left-20);
			if(left<=0)
				$('#carrinho').css("left", 0);
		}
	} //Movimenta carrinho

	function verificarVitoria() {
		if (pontos >= 10000 && !vitoria_alcancada) {
			vitoria_alcancada = true;
			mostrarTelaDeVitoria();
		}
	}

	function verificaPontuacao() {
		if (pontos >= ultimoMultiploVerificado + 1000) {
			velocidade += 1;
			ultimoMultiploVerificado += 1000;
		}
		
		verificarVitoria();
	}

	function movimentapolicial() {
		var top = parseInt($('#policial').css("top"));
		$('#policial').css("top", top + (5 + velocidade));
		if(top >= 557) {
			nasce_policial();
			pontos = pontos + 50;
		}
	}
	
	function nasce_policial() {
        var local = Math.floor(Math.random() * 491);
        $('#policial').css("left", local);
        $('#policial').css("top", -80);
    }

	function movimentataxi() {
		var top = parseInt($('#taxi').css("top"));
		$('#taxi').css("top", top + (5 + velocidade));
		if(top >= 542) {
			nasce_taxi();
			pontos = pontos + 50;
		}
	}
	
	function nasce_taxi() {
        var local = Math.floor(Math.random() * 491);
        $('#taxi').css("left", local);
        $('#taxi').css("top", -80);
    }

	function movimentaonibus() {
		var top = parseInt($('#onibus').css("top"));
		$('#onibus').css("top", top + (5 + velocidade));
		if(top >= 600) {
			nasce_onibus();
			pontos = pontos + 100;
		}
	}
	
	function nasce_onibus() {
        var local = Math.floor(Math.random() * 491);
        $('#onibus').css("left", local);
        $('#onibus').css("top", -150);
    }

    function movimentacaminhao() {
        var top = parseInt($('#caminhao').css("top"));
        $('#caminhao').css("top", top + (5 + velocidade));
        if (top >= 618) {
            nasce_caminhao();
            pontos = pontos + 100;
        }
    } 

    function nasce_caminhao() {
        var local = Math.floor(Math.random() * 491); 
        $('#caminhao').css("left", local);
        $('#caminhao').css("top", -150);
    }
	
	function movimentamoeda() {
		var top = parseInt($('#moeda').css("top"));
		$('#moeda').css("top", top + velocidade);
		if (top >= 600) {
			nasce_moeda();
		}
	}

	function movimentapessoa() {
		var top = parseInt($('#pessoa').css("top"));
		$('#pessoa').css("top", top + (3 + velocidade));
		if (top >= 600) {
			nasce_pessoa();
		}
	}
	
	function nasce_moeda() {
		var local = Math.random() * 250;
		$('#moeda').css("left", local);
		$('#moeda').css("top", 0);
	}

	function nasce_pessoa() {
		var local = Math.random() * 250;
		$('#pessoa').css("left", local);
		$('#pessoa').css("top", -10);
	}
	
	function colisao() {
		var colisao_carrinho_moeda =  ($("#carrinho").collision($("#moeda")));
		var colisao_carrinho_pessoa =  ($("#carrinho").collision($("#pessoa")));
		var colisaocarrinhopolicial = $("#carrinho").collision($("#policial"));
		var colisaocarrinhotaxi = $("#carrinho").collision($("#taxi"));
		var colisaocarrinhoonibus = $("#carrinho").collision($("#onibus"));
        var colisaocarrinhocaminhao = $("#carrinho").collision($("#caminhao"));
	
		if(colisao_carrinho_moeda.length > 0) {
			moeda_morto = true;
			coin.play();
			$('#moeda').remove();
			setTimeout(function() {
				moeda_morto = false;
				$('#area_jogo').append("<div id='moeda' class='moeda'></div>");
				nasce_moeda();
			},2000);
			pontos = pontos + 200;
		}

		if (colisao_carrinho_pessoa.length > 0) {
            var posicao_x = parseInt($('#pessoa').css("left"));
            var posicao_y = parseInt($('#pessoa').css("top"));
			salva.play();
            $('#pessoa').remove();
            $('#area_jogo').append("<div id='pessoa_mor' class='pessoa_morre'></div>");
            $('#pessoa_mor').css('top', posicao_y);
            $('#pessoa_mor').css('left', posicao_x);

            sangue = $('#pessoa_mor');
            setTimeout(function() {
                $('#pessoa_mor').remove();
                $('#area_jogo').append("<div id='pessoa' class='pessoa'></div>");
                nasce_pessoa();
				
            }, 2000);
            pontos -= 200;
        }

		if (invencivel) return;

		if ((colisaocarrinhopolicial.length > 0 || colisaocarrinhocaminhao.length > 0 || colisaocarrinhoonibus.length > 0 || colisaocarrinhotaxi.length > 0) && !invencivel) {
			explode.play();
			removevida();
			if (vida == 0) {
				$('#carrinho').remove();
				return;
			}
			var posicao_x = parseInt($('#carrinho').css("left"));
			var posicao_y = parseInt($('#carrinho').css("top"));
			$('#carrinho').remove();
			$('#area_jogo').append("<div id='carrinho_exp' class='carrinho_explode'></div>");
			$('#carrinho_exp').css('top', (posicao_y));
			$('#carrinho_exp').css('left', posicao_x);
			setTimeout(function() {
				$('#carrinho_exp').remove();
				$('#area_jogo').append("<div id='carrinho' class='carrinho invencivel'></div>");
				invencivel = true;
				setTimeout(function() {
					invencivel = false;
					$('#carrinho').removeClass('invencivel');
				}, 3000);
			}, 500);
			pontos -= 100;
		}
		
	}
	
	function mostrapontos() {
		$('#pontuacao').text("Pontos: " + pontos);
	}
	
	function removevida() {
		switch(vida) {
			case 4: {
				$('#vida_carrinho').css("background-position","-92px 44px");
				vida--;
				break;
			}
			case 3:{
				$('#vida_carrinho').css("background-position","-184px 44px");
				vida--;
				break;
			}
			case 2:{
				$('#vida_carrinho').css("background-position","-276px 44px");
				vida--;
				break;
			}
			default: {
				$('#carrinho').remove();
				$('#carrinho_exp').remove();
				$('#policial').remove();
				$('#taxi').remove();
				$('#onibus').remove();
				$('#caminhao').remove();
				$('#pessoa').remove();
				$('#moeda').remove();
				$('#vida_carrinho').remove();
				$('#vitoria').hide();
				$('#gameover').show();
			}
		}
	}

	function mostrarTelaDeVitoria() {
		victory.play();
	
		$('#carrinho').remove();
		$('#carrinho_exp').remove();
		$('#policial').remove();
		$('#taxi').remove();
		$('#onibus').remove();
		$('#caminhao').remove();
		$('#pessoa').remove();
		$('#moeda').remove();
		$('#vida_carrinho').remove();
		$('#vitoria').show();
		$('#gameover').hide();
	}
}
function reiniciar() {
location.reload();
}