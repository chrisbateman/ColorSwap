var Game = function() {
	
	var _$container;
	var _colors = ['fe2712', 'ffac2b', '66b032',  '3d01a4', 'fefe33', 'd96400', '0392ce', '8601af', 'a8e900', '0247fe', 'a7194b'];
	var _splitFactor = 3;
	var _currentColors = [];
	var _colorIndex = -1;
	
	var _totalSquares = _splitFactor * _splitFactor;
	var _currentlyFlipped = 0;
	
	
	var _init = function(container) {
		$(window).bind('touchmove', function(ev) {
			ev.preventDefault();
		});
		_$container = $('#'+container);
		_createSquares(_splitFactor);
	};
	
	
	var _createSquares = function(splitFactor) {
		_currentColors = _getRandomizedArray(_colors);
		
		// randomly select flip color
		var flipColor = _currentColors.splice(Math.floor(Math.random()*_currentColors.length), 1);
		
		for (var row=0; row<splitFactor; row++) {
			for (var col=0; col<splitFactor; col++) {
				var sq = new _square(flipColor);
				_$container.append(sq.$elem);
			}
		}
	};
	
	
	var _square = function(flipColor) {
		this.color = _getNextColor();
		this.$elem = $('<div class="square-container"></div>');
		
		
		this.$elem.addClass('square-container');
		this.$elem.css({
			'width': (100/_splitFactor).toFixed(3) + '%',
			'height': (100/_splitFactor).toFixed(3) + '%'
		});
		this.$elem.one('mousedown touchstart', function() {
			if ($(this).hasClass('flipped')) {
				return;
			}
			
			$(this).addClass('flipped');
			
			_currentlyFlipped++;
			_checkDone();
		});
		
		
		var $sq = $('<div class="square"></div>');
		$sq.css('backgroundColor', this.color);
		this.$elem.append($sq);
		
		var $inner = $('<div style="background-color:#' + flipColor +'"></div>');
		$inner.css('backgroundColor' , '#' + flipColor);
		$sq.append($inner);
	};
	
	
	
	var _getNextColor = function() {
		if (_colorIndex >= _currentColors.length) {
			_colorIndex = -1;
		}
		
		_colorIndex++;
		
		return '#' + _currentColors[_colorIndex];
	};
	
	
	var _checkDone = function() {
		if (_currentlyFlipped >= _totalSquares)	{
			setTimeout(_reset, 1500);
		}
	};
	
	
	var _reset = function() {
		_currentlyFlipped = 0;
		_colorIndex = -1;
		_$container.html('');
		
		_createSquares(_splitFactor);
	};
	
	
	var _getRandomizedArray = function(arr) {
		var arrCopy = arr.slice(0);
		var i = arrCopy.length;
		if (i === 0) {
			return false;
		}
		while (--i) {
			var j = Math.floor(Math.random() * (i + 1));
			var tempi = arrCopy[i];
			var tempj = arrCopy[j];
			arrCopy[i] = tempj;
			arrCopy[j] = tempi;
		}
		return arrCopy;
	};
	
	
	
	return {
		init: _init
	};
}();


Game.init('container');



// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {
	window.applicationCache.addEventListener('updateready', function(e) {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			// Browser downloaded a new app cache.
			// Swap it in and reload the page to get the new hotness.
			window.applicationCache.swapCache();
			if (confirm('A new version of this app is available. Load it now?')) {
				window.location.reload();
			}
		}
	}, false);

}, false);