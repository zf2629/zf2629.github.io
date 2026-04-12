/**
 * 3D圆柱旋转动画模块
 * 标准接口：window.IntroAnimations.cylinder = { setup, run, land, teardown }
 */
(function() {
    var cylinderRAF = null;
    var cylinderWraps = [];
    var cylinderTilesEl = null;
    var cylinderRadius = 0;
    var cylinderAngleStep = 0;
    var cylinderVignetteEl = null;
    var cylinderEndDegrees = 0;

    // 将行包裹并定位到圆柱面（全部隐藏）
    function setup(stage) {
        cylinderTilesEl = stage.querySelector('.stage-tiles');
        var rows = Array.from(cylinderTilesEl.querySelectorAll('.stage-row'));
        var numRows = rows.length;
        var vh = window.innerHeight;
        var radius = Math.round(vh * 0.38);
        var angleStep = 360 / numRows;
        cylinderRadius = radius;
        cylinderAngleStep = angleStep;
        cylinderWraps = [];
        rows.forEach(function(row, i) {
            var cs = getComputedStyle(row);
            row.style.animationName = cs.animationName;
            row.style.animationDuration = cs.animationDuration;
            row.style.animationDelay = cs.animationDelay;
            var wrap = document.createElement('div');
            wrap.className = 'stage-row-wrap';
            wrap.style.transform = 'rotateX(' + (i * angleStep) + 'deg) translateZ(' + radius + 'px)';
            row.parentNode.insertBefore(wrap, row);
            wrap.appendChild(row);
            cylinderWraps.push(wrap);
        });
        cylinderVignetteEl = document.createElement('div');
        cylinderVignetteEl.className = 'cylinder-vignette';
        stage.appendChild(cylinderVignetteEl);
        stage.classList.add('stage-3d');
    }

    // rAF驱动旋转：娓娓道来的叙事节奏，匀速为主，首尾微弱减速
    function run(stage, duration, onComplete) {
        var startTime = null;
        var totalRotations = 1;
        var totalDegrees = totalRotations * 360;
        var durationMs = duration * 1000;

        // 行交错显现：从中间向两侧依次出现
        var mid = Math.floor(cylinderWraps.length / 2);
        var staggerOrder = [];
        for (var m = 0; m < cylinderWraps.length; m++) {
            staggerOrder.push({ idx: m, dist: Math.abs(m - mid) });
        }
        staggerOrder.sort(function(a, b) { return a.dist - b.dist; });
        staggerOrder.forEach(function(item, i) {
            setTimeout(function() {
                cylinderWraps[item.idx].classList.add('visible');
            }, i * 200);
        });

        // 近线性缓动：80%线性 + 20% smoothstep，全程连续无断裂
        function easeNarrative(t) {
            var s = t * t * (3 - 2 * t);
            return 0.8 * t + 0.2 * s;
        }

        var perspBase = window.innerWidth <= 768 ? 800 : 1200;

        function tick(ts) {
            if (!startTime) startTime = ts;
            var elapsed = ts - startTime;
            var progress = Math.min(elapsed / durationMs, 1);
            var eased = easeNarrative(progress);
            var degrees = eased * totalDegrees;

            var tilt = eased * (-12);
            var scale = 1.05 + progress * 0.12;

            var sinF = Math.sin(progress * Math.PI);

            stage.style.perspective = (perspBase + sinF * 150 | 0) + 'px';
            stage.style.perspectiveOrigin = '50% ' + (50 + sinF * 2).toFixed(1) + '%';

            cylinderVignetteEl.style.opacity = 0.4 + sinF * 0.3;

            cylinderTilesEl.style.transform =
                'rotateZ(' + tilt.toFixed(2) + 'deg) rotateX(' + (-degrees) + 'deg) scale(' + scale.toFixed(3) + ')';

            stage.style.filter =
                'brightness(' + (1 + sinF * 0.06).toFixed(2) + ')';

            if (progress < 1) {
                cylinderRAF = requestAnimationFrame(tick);
            } else {
                cylinderRAF = null;
                cylinderEndDegrees = totalDegrees;
                onComplete();
            }
        }

        cylinderRAF = requestAnimationFrame(tick);
    }

    // 着陆：减速旋转 + 半坍缩 + 角度对齐背景(-15deg scale1.3) → 淡出
    function land(stage, duration, onDone) {
        var landStart = null;
        var mainDur = duration;
        var landDuration = Math.round(mainDur * 320);
        var startRadius = cylinderRadius;
        var startPersp = parseFloat(stage.style.perspective) || 1200;
        var endVelocity = 0.8 * 360 / mainDur;
        var extraRotation = Math.round(endVelocity * landDuration / 3000);
        var targetTilt = -15;
        var targetScale = 1.3;
        var startTilt = -12;
        var startScale = 1.17;

        var numWraps = cylinderWraps.length;
        var midIdx = (numWraps - 1) / 2;

        function landTick(ts) {
            if (!landStart) landStart = ts;
            var p = Math.min((ts - landStart) / landDuration, 1);
            var ease = 1 - Math.pow(1 - p, 3);

            var collapseP = p < 0.15 ? 0 : (p - 0.15) / 0.85;
            var collapseEase = 1 - Math.pow(1 - collapseP, 2);
            var overshoot = collapseP > 0 ? Math.sin(collapseP * Math.PI) * 0.08 : 0;
            var collapseFactor = collapseEase * 0.85 + overshoot;

            cylinderWraps.forEach(function(wrap, i) {
                var distFromMid = Math.abs(i - midIdx) / midIdx;
                var rowDelay = distFromMid * 0.15;
                var rowCollapse = Math.max(0, collapseFactor - rowDelay);
                var r = startRadius * (1 - rowCollapse);
                wrap.style.transform =
                    'rotateX(' + (i * cylinderAngleStep) + 'deg) translateZ(' + r.toFixed(1) + 'px)';
                if (p > 0.3) {
                    var rowFade = 1 - (p - 0.3) / 0.7 * (1 + distFromMid * 0.4);
                    wrap.style.opacity = Math.max(0, rowFade).toFixed(2);
                }
            });

            stage.style.perspective = (startPersp + (3000 - startPersp) * collapseEase | 0) + 'px';
            stage.style.perspectiveOrigin = '50% 50%';

            var landDeg = cylinderEndDegrees + ease * extraRotation;
            var tiltEase = 1 - (1 - p) * (1 - p);
            var tiltEnd = startTilt + tiltEase * (targetTilt - startTilt);
            var scaleEnd = startScale + collapseEase * (targetScale - startScale);
            var sinkY = ease * 20;

            cylinderTilesEl.style.transform =
                'rotateZ(' + tiltEnd.toFixed(2) + 'deg) rotateX(' + (-landDeg).toFixed(1) + 'deg) translateY(' + sinkY.toFixed(1) + 'px) scale(' + scaleEnd.toFixed(3) + ')';

            if (p > 0.4) {
                stage.style.opacity = (1 - (p - 0.4) / 0.6).toFixed(2);
            }

            if (cylinderVignetteEl) {
                cylinderVignetteEl.style.opacity = 0.4 * (1 - ease);
            }

            if (p < 1) {
                cylinderRAF = requestAnimationFrame(landTick);
            } else {
                cylinderRAF = null;
                onDone();
            }
        }
        cylinderRAF = requestAnimationFrame(landTick);
    }

    // 拆除包裹，恢复平面布局
    function teardown(stage) {
        if (cylinderRAF) {
            cancelAnimationFrame(cylinderRAF);
            cylinderRAF = null;
        }
        if (!cylinderTilesEl) return;
        var wraps = cylinderTilesEl.querySelectorAll('.stage-row-wrap');
        wraps.forEach(function(wrap) {
            var row = wrap.querySelector('.stage-row');
            if (row) {
                cylinderTilesEl.insertBefore(row, wrap);
                wrap.remove();
            }
        });
        cylinderTilesEl.style.transform = '';
        cylinderTilesEl.style.willChange = '';
        stage.style.filter = '';
        stage.style.perspective = '';
        stage.style.perspectiveOrigin = '';
        if (cylinderVignetteEl && cylinderVignetteEl.parentNode) {
            cylinderVignetteEl.remove();
            cylinderVignetteEl = null;
        }
        stage.classList.remove('stage-3d');
        stage.style.transition = '';
        stage.style.opacity = '';
        cylinderTilesEl.querySelectorAll('.stage-row').forEach(function(row) {
            row.style.animationName = '';
            row.style.animationDuration = '';
            row.style.animationDelay = '';
        });
        cylinderWraps = [];
        cylinderTilesEl = null;
    }

    // 注册到全局动画接口
    window.IntroAnimations = window.IntroAnimations || {};
    window.IntroAnimations.cylinder = {
        setup: setup,
        run: run,
        land: land,
        teardown: teardown
    };
})();
