
const headerMenu=document.querySelector('.hm-header');

console.log(headerMenu.offsetTop);

window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 80){
        headerMenu.classList.add('header-fixed');
    }else{
        headerMenu.classList.remove('header-fixed');
    }
})

/*=========================================
    Tabs
==========================================*/
if(document.querySelector('.hm-tabs')){

    const tabLinks=document.querySelectorAll('.hm-tab-link');
    const tabsContent=document.querySelectorAll('.tabs-content');

    tabLinks[0].classList.add('active');

    if(document.querySelector('.tabs-content')){
        tabsContent[0].classList.add('tab-active');
    }
    

    for (let i = 0; i < tabLinks.length; i++) {
        
        tabLinks[i].addEventListener('click',()=>{

            
            tabLinks.forEach((tab) => tab.classList.remove('active'));
            tabLinks[i].classList.add('active');
            
            tabsContent.forEach((tabCont) => tabCont.classList.remove('tab-active'));
            tabsContent[i].classList.add('tab-active');
            
        });
        
    }

}

/*=========================================
    MENU
==========================================*/

const menu=document.querySelector('.icon-menu');
const menuClose=document.querySelector('.cerrar-menu');

menu.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.add('active');
})

menuClose.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.remove('active');
})


/*=========================================
    BOTONES DE COMPRAR
==========================================*/

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.add('show');
  
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.style.display = 'none';
      }, 500); // Espera a que la opacidad se desvanezca
    }, 2500); // Muestra el toast por 2.5 segundos
  
    toast.style.display = 'block';
  }
  



const botonesComprar = document.querySelectorAll('.btn-primary');

botonesComprar.forEach(boton => {
  boton.addEventListener('click', () => {
    const producto = boton.closest('.product-item');
    const nombreProducto = producto.querySelector('h3').textContent;
    const imagen = producto.querySelector('img').src;

    const mensaje = `Hola, me gustaría adquirir este producto: *${nombreProducto}*.\n\n${imagen}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  });
});


const carrito = [];
const botonesAgregar = document.querySelectorAll('.btn-secondary');
const iconoCarrito = document.querySelector('.hm-icon-cart span');
const modalCarrito = document.querySelector('.modal-carrito');
const listaProductos = document.querySelector('.lista-productos');
const btnCotizar = document.getElementById('btn-cotizar');
const btnCerrarModal = document.getElementById('cerrar-modal');
const numeroWhatsApp = '593989821560';

// Agregar productos al carrito
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const producto = boton.closest('.product-item');
    const nombre = producto.querySelector('h3').textContent;
    
    carrito.push(nombre);
    iconoCarrito.textContent = carrito.length;

    mostrarToast(`"${nombre}" agregado al carrito`);

  });
});

// Mostrar modal al hacer clic en el icono del carrito
document.querySelector('.hm-icon-cart a').addEventListener('click', (e) => {
  e.preventDefault();
  mostrarCarrito();
});

function mostrarCarrito() {
  listaProductos.innerHTML = '';

  if (carrito.length === 0) {
    listaProductos.innerHTML = '<li>No hay productos en el carrito.</li>';
  } else {
    carrito.forEach(nombre => {
      const li = document.createElement('li');
      li.textContent = nombre;
      listaProductos.appendChild(li);
    });
  }

  modalCarrito.style.display = 'flex';
}

// Cerrar modal
btnCerrarModal.addEventListener('click', () => {
  modalCarrito.style.display = 'none';
});

// Enviar lista por WhatsApp
btnCotizar.addEventListener('click', () => {
  if (carrito.length === 0) {
    mostrarToast('Tu carrito está vacío');

    return;
  }

  const mensaje = `Hola, me gustaría cotizar la siguiente lista de productos:\n\n${carrito.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, '_blank');
});
