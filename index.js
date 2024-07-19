document.addEventListener('DOMContentLoaded', () => { 
fetchMenuItems();
 fetchDrinks(); 
});
 //Fetch and then display menu items
function fetchMenuItems() {
fetch('http://localhost:3000/menuItems') .then(response => response.json()) .then(menuItems => {
const menuList = document.getElementById('menu-list');
menuList.innerHTML = ''; 
//To clear the previous items
 menuItems.forEach(item => { 
const itemDiv = document.createElement('div'); 
itemDiv.className = 'menu-item'; 
itemDiv.innerHTML = ` <img src="${item.image}" alt="${item.name}"> 
<div>
<h3>${item.name}</h3> 
<p>Price: Ksh ${item.price}</p>
<p>${item.description}</p>
</div>
 <button style="background:#053d7df0; color:white; margin: 20px;" class= "edit" onclick="editMenuItem(${item.id})">Edit</button> 
 <button style="background:#053d7df0; color:white; margin:20px;"  class="delete" onclick="deleteMenuItem(${item.id})">Delete</button> 
 `;
  menuList.appendChild(itemDiv); 
});
 });
 }
  
    //Adding event listener for adding menu items 
  document.getElementById('add-menu-form').addEventListener('submit', event => { 
  event.preventDefault(); const name = document.getElementById('menu-name').value;
 const image = document.getElementById('menu-image').value;
 const price = document.getElementById('menu-price').value; 
 const description = document.getElementById('menu-description').value;
  const newMenuItem = { name, image, price, description };
 fetch('http://localhost:3000/menuItems', {
  method: 'POST',
   headers: {
     'Content-Type': 'application/json'
     },
      body: JSON.stringify(newMenuItem)
     }) 
     .then(response => response.json()) .then(item => {
       fetchMenuItems(); 
       //refresh the menu items list
        document.getElementById('add-menu-form').reset();
         //Clear the form
         });
         });
                // Edit menu item 
              function editMenuItem(id) {
               const newName = prompt('Enter new name:', 'New Name'); 
               const newPrice = prompt('Enter new price:', '999');
              const newDescription = prompt('Enter new description:', 'New Description'); 
              const newImage = prompt('Enter new image URL:', 'New Image URL');
               if (newName && newPrice && newDescription && newImage) {
               fetch(`http://localhost:3000/menuItems/${id}`, {
                 method: 'PATCH', 
                 headers: { 
                  'Content-Type': 'application/json' 
                },
               body: JSON.stringify({ name: newName, price: newPrice, description: newDescription, image: newImage 
              })
             })
              .then(response => response.json()) .then(() => { 
              fetchMenuItems();
               //Refresh the menu items list 
               });
              }
             }
            //Delete menu item
            function deleteMenuItem(id) {
          console.log(id)
      

          
           fetch(`http://localhost:3000/menuItems/${id}`, { 
            method: 'DELETE' 
          }) 
          .then(response => response.json()) .then(() => {
           fetchMenuItems();
            //Refresh the menu items list 
            });
           }
           //Adding event listener to review form
           document.getElementById('reviewForm').addEventListener('submit', function(event) {
          event.preventDefault(); 
          const ratingBody = {
            name : event.target.name.value,
            rating: event.target.rating.value,
            review: event.target.review.value,
            }

          fetch("http://localhost:3000/reviews", { 
          method: 'POST',
          body: JSON.stringify(ratingBody)
            
            
        })
         .then(response => response.json()) .then(data => {
         console.log('Success:', data); 
        })
         .catch(error => { 
          console.error('Error:', error); 
        });
       });
 
            
          
