import util from 'util';
import Effect from 'game/Effect';
import Worker from 'game/Worker';

const effectsTemplate = item => `
<ul class="effects">
  ${item.effects.map(e => `
    <li>${Effect.toString(e)}</li>
  `).join('')}
</ul>`;

const attributesTemplate = item => `
  <ul class="worker-attributes">
    ${item.attributes.map(i => `
      <li data-tip="<ul>${Worker.attributeToStrings(i).map(s => `<li>${s}</li>`).join('')}</ul>">${i}</li>
    `).join('')}
  </ul>
`;

const skillsTemplate = item => `
  <ul class="worker-stats">
    <li data-tip="Productivity"><img src="/assets/company/productivity.png"> ${util.abbreviateNumber(Math.round(item.productivity), 0)}</li>
    <li data-tip="Design"><img src="/assets/company/design.png"> ${util.abbreviateNumber(Math.round(item.design), 0)}</li>
    <li data-tip="Marketing"><img src="/assets/company/marketing.png"> ${util.abbreviateNumber(Math.round(item.marketing), 0)}</li>
    <li data-tip="Engineering"><img src="/assets/company/engineering.png"> ${util.abbreviateNumber(Math.round(item.engineering), 0)}</li>
    <li data-tip="Happiness"><img src="/assets/company/happiness.png"> ${util.abbreviateNumber(Math.round(item.happiness), 0)}</li>
  </ul>
`;

const prereqsTemplate = item => `
  <div class="prereqs">Requires:
    ${item.prereqs.map(i => `
      <span class="prereq ${i.ok ? 'ok' : ''}">${i.name.replace('.','+')}</span>
    `).join('')}</div>
`;

const workerTemplate = item => `
<div class="worker-avatar">
  <img src="/assets/workers/gifs/${item.avatar}.gif">
  <div class="assigned-task worker-task">${item.task ? `Assigned:<br>${item.task.obj.name}` : ''}</div>
</div>
<div class="worker-info">
  <div class="worker-title">
    <h1>${item.name}</h1>
    <h3 class="subtitle">${item.title}, <span class="cash">${util.formatCurrencyAbbrev(item.salary)}/yr</span></h3>
  </div>
  <div class="worker-body">
    ${skillsTemplate(item)}
    ${item.attributes.length > 0 ? attributesTemplate(item) : ''}
  </div>
  ${item.fireable ? `<button class="fire">Fire</button>` : ''}
</div>
`

export default {
  effects: effectsTemplate,
  attributes: attributesTemplate,
  skills: skillsTemplate,
  prereqs: prereqsTemplate,
  worker: workerTemplate
};