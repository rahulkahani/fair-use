'use strict';

// Directed presentation only. Timings control authored scenes, never model execution.
const reelScenes = [
  {title:'The creative question', seconds:6, voice:'You’ve made a remix. Now you have a copyright question. That’s the problem I wanted this skill to help people understand.', action:'Open on the question. Let the last line land before advancing.'},
  {title:'Inside the actual skill', seconds:8, voice:'I built an open skill around a structured workflow and reference material. The instructions explicitly define it as educational support, not legal advice.', action:'The file excerpt is real. This is a retrospective of the build, not a live coding session.'},
  {title:'Ask for the right facts', seconds:8, voice:'First it asks for the relevant country, what was borrowed, the intended use, and any permission. Unknown facts should stay unknown.', action:'Let the four questions appear. Emphasize your design choice: ask before assuming.'},
  {title:'The fictional remix', seconds:9, voice:'Here’s a fictional Photoshop example. Assume someone kept an illustrator’s distinctive character, but changed the background, colors, and typography. These visuals are placeholders.', action:'Show both schematic images. No real artist’s work or actual visual analysis is implied.'},
  {title:'Supply the context', seconds:9, voice:'The prepared example says: I want to sell fifty posters in the US, and I don’t have permission. What should I understand and ask a lawyer?', action:'This is a displayed prompt. It is not being sent to an AI service.'},
  {title:'Explain the considerations', seconds:9, voice:'This prewritten response illustrates how the workflow considers purpose, the source, significant borrowing, and market effects together. It also names the missing evidence.', action:'Call it a prewritten illustration. A weaker argument is not a finding of infringement.'},
  {title:'Prepare the next conversation', seconds:8, voice:'The useful outcome is an organized brief: what you know, what’s missing, and questions to take to a qualified lawyer.', action:'This scene illustrates the brief structure. The main demo contains the working brief builder.'},
  {title:'Invite people to explore', seconds:7, voice:'It’s called Fair Use. The skill is open source on GitHub, for copyright education and review preparation. It’s not a substitute for professional legal review.', action:'Hold the repository address. End here; the sequence never loops automatically.'}
];
const reelEl = id => document.getElementById(id);
const panels = Array.from(document.querySelectorAll('[data-scene]'));
const starts = reelScenes.map((_, i) => reelScenes.slice(0,i).reduce((sum,s) => sum+s.seconds,0));
const total = reelScenes.reduce((sum,s) => sum+s.seconds,0);
let current = 0;
let elapsed = 0;
let playing = false;
let lastTime = 0;
let frame = null;

const clock = seconds => `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
const sceneButtons = reelScenes.map((scene,index) => {
  const button = document.createElement('button');
  button.type = 'button';
  const number = document.createElement('span');
  number.textContent = String(index+1).padStart(2,'0');
  button.append(number,document.createTextNode(scene.title));
  button.addEventListener('click',() => go(index));
  reelEl('scene-list').append(button);
  return button;
});

function renderTime() {
  reelEl('timeline').value = elapsed;
  reelEl('time-label').textContent = `${clock(elapsed)} / ${clock(total)}`;
}
function renderScene() {
  panels.forEach((panel,index) => {
    panel.hidden = index !== current;
    panel.classList.remove('active');
    if (index === current) sceneButtons[index].setAttribute('aria-current','step');
    else sceneButtons[index].removeAttribute('aria-current');
  });
  // Retakes of the current scene must replay its entrance sequence too.
  void panels[current].offsetWidth;
  panels[current].classList.add('active');
  reelEl('frame-counter').textContent = `${String(current+1).padStart(2,'0')} / ${String(reelScenes.length).padStart(2,'0')}`;
  reelEl('cue-title').textContent = reelScenes[current].title;
  reelEl('cue-text').textContent = reelScenes[current].voice;
  reelEl('cue-action').textContent = reelScenes[current].action;
  reelEl('previous').disabled = current === 0;
  reelEl('next').disabled = current === reelScenes.length-1;
  renderTime();
}
function status(message) {
  reelEl('play-status').textContent = message;
  reelEl('play').textContent = playing ? 'Pause sequence' : elapsed >= total ? 'Replay sequence' : 'Play sequence';
}
function stop(message='Paused · manual control') {
  playing = false;
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  status(message);
}
function go(index) {
  if (index < 0 || index >= reelScenes.length) return;
  stop();
  current = index;
  elapsed = starts[index];
  renderScene();
  status('Paused · manual control');
}
function tick(now) {
  if (!playing) return;
  elapsed = Math.min(total,elapsed+(now-lastTime)/1000);
  lastTime = now;
  let nextScene = starts.findLastIndex(start => start <= elapsed);
  if (nextScene !== current) { current = nextScene; renderScene(); }
  renderTime();
  if (elapsed >= total) { stop('Complete · R to restart'); return; }
  frame = requestAnimationFrame(tick);
}
function play() {
  if (playing) { stop(); return; }
  if (elapsed >= total) { current=0; elapsed=0; renderScene(); }
  playing = true;
  lastTime = performance.now();
  status('Playing scripted sequence');
  frame = requestAnimationFrame(tick);
}
function capture(enabled) {
  document.body.classList.toggle('capture',enabled);
  for (const id of ['capture','capture-top']) reelEl(id).setAttribute('aria-pressed',String(enabled));
  // Touch users can tap the stage to restore controls; disclosure is never hidden.
  reelEl('stage').setAttribute('tabindex',enabled ? '0' : '-1');
  if (enabled) {
    reelEl('stage').setAttribute('role','button');
    reelEl('stage').setAttribute('aria-label','Recording canvas. Tap or press Escape to restore controls.');
    reelEl('stage').focus({preventScroll:true});
  } else {
    reelEl('stage').removeAttribute('role');
    reelEl('stage').removeAttribute('aria-label');
    reelEl('capture').focus({preventScroll:true});
  }
}

reelEl('previous').addEventListener('click',() => go(current-1));
reelEl('next').addEventListener('click',() => go(current+1));
reelEl('restart').addEventListener('click',() => { go(0); status('Ready · manual control'); });
reelEl('play').addEventListener('click',play);
for (const id of ['capture','capture-top']) reelEl(id).addEventListener('click',() => capture(!document.body.classList.contains('capture')));
reelEl('record-start').addEventListener('click',() => { go(0); capture(true); play(); });
reelEl('stage').addEventListener('click',() => { if(document.body.classList.contains('capture')) capture(false); });
document.addEventListener('keydown',event => {
  if(event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
  if(['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName) || event.target.isContentEditable) return;
  const key = event.key.toLowerCase();
  if(key === 'escape') { capture(false); return; }
  if(key === 'enter' && event.target === reelEl('stage') && document.body.classList.contains('capture')) { event.preventDefault(); capture(false); return; }
  // Preserve native Space activation when a visible button is focused.
  if(key === ' ' && event.target.tagName === 'BUTTON') return;
  if([' ','arrowright','arrowleft','r','c'].includes(key)) event.preventDefault();
  if(key === ' ') play();
  else if(key === 'arrowright') go(current+1);
  else if(key === 'arrowleft') go(current-1);
  else if(key === 'r') { go(0); status('Ready · manual control'); }
  else if(key === 'c') capture(!document.body.classList.contains('capture'));
});
document.addEventListener('visibilitychange',() => { if(document.hidden && playing) stop('Paused while tab is hidden'); });
renderScene();
