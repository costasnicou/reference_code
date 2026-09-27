// 'use strict';



document.addEventListener('DOMContentLoaded',function(){
const selectedbtn = document.querySelector('.btnAutoselect');
// console.log(selectedbtn);
selectedbtn.click();
});


const overlay = document.querySelector('.overlay');
document.querySelectorAll('dialog').forEach(dialog =>  {
    dialog.querySelector('.close').addEventListener('click', function(){
        overlay.classList.add('hidden');     
        dialog.close();
      }
    )

    dialog.addEventListener('click', e =>  {
      if (e.target === dialog)  {
        const r=dialog.getBoundingClientRect();
        if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){
          overlay.classList.add('hidden');
          dialog.close();
        }

        
      }
    }
    );

    dialog.addEventListener('keydown', e =>{
      if (e.key === "Escape"){
         overlay.classList.add('hidden');     
        dialog.close();
      }
    })
  }
);

const photoDialog = document.querySelector('#photo-dialog');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () =>  {
  const img = photoDialog.querySelector('img');
  img.src = button.dataset.photo;
  img.alt = button.dataset.caption;
  // document.querySelector('#photo-caption').textContent = button.dataset.caption;
  // document.querySelector('#photo-source').href = button.dataset.source;
  photoDialog.showModal();
  overlay.classList.remove('hidden');
}
));



document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () =>  {
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelectorAll('[data-category]').forEach(card =>  {
    card.hidden = button.dataset.filter !== 'Όλα' && card.dataset.category !== button.dataset.filter;
  }
  );
}
));

