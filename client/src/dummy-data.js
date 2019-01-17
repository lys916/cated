const foodItems = [
   {
      image: "chicken-feet-salad.png",
      name: 'Chicken Feet Salad',
      desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
      tags: 'Chicken Feet Salad',
      price: {
         Small: 19,
         Medium: 29,
         Large: 39
      },
      qty: 1,
      type: 'food',
      _id: 1
   },
   {
      image: "beef-larb-cooked.png",
      name: 'Beef Larb Cooked',
      desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
      tags: 'Beef Salad Larb Laab',
      price: {
         Small: 19,
         Medium: 29,
         Large: 39
      },
      qty: 1,
      type: 'food',
      _id: 2
   }, 
   {
      image: "beef-larb-raw.png",
      name: 'Beef Larb Raw',
      desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
      tags: 'Beef Salad Larb Laab',
      price: {
         Small: 19,
         Medium: 29,
         Large: 39
      },
      qty: 1,
      type: 'food',
      _id: 2
   },
   {
      image: "papaya-salad.png",
      name: 'Papaya Salad',
      desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
      tags: 'Spicy Papaya Salad',
      price: {
         Small: 19,
         Medium: 29,
         Large: 39
      },
      qty: 1,
      type: 'food',
      _id: 15
   },

   // {
   //    image: "sample.png",
   //    name: 'Stir-Fry Vermicelli Noodle',
   //    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
   //    tags: 'Vermicelli Noodle Stir',
   //    price: {
   //       Small: 19,
   //       Medium: 29,
   //       Large: 39
   //    },
   //    qty: 1,
   //    type: 'food',
   //    _id: 3
   // },
   {
      image: "grilled-wings.png",
      name: 'Grilled Wings',
      desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
      price: {
         Small: 19,
         Medium: 29,
         Large: 39
      },
      qty: 1,
      type: 'food',
      _id: 4
   },
   {
      image: "bbq-ribs.png",
      name: 'BBQ Pork Ribs',
      desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
      price: {
         Small: 19,
         Medium: 29,
         Large: 39
      },
      qty: 1,
      type: 'food',
      _id: 5
   },
   {
      image: "mien-salad.png",
      name: 'Mien Salad',
      desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
      price: {
         Small: 19,
         Medium: 29,
         Large: 39
      },
      qty: 1,
      type: 'food',
      _id: 6
   }
]

const drinkItems = [
	{
		image: "heineken12.png",
      name: 'Heineken',
      desc: '12 packs, 16oz bottle',
		tags: 'Beer',
		price: 19,
      unit: '12 Pack',
      type: 'drink',
      qty: 1,
      _id: 22
      
	},
	{
      image: "corona12.png",
      name: 'Corona Extra',
      desc: '12 packs, 16oz bottle',
		tags: 'Beer',
		price: 19,
      unit: '12 Pack',
      type: 'drink',
      qty: 1,
		_id: 23
	}, {
      image: "sierra-nevada12.png",
      name: 'Sierra Nevada Pale Ale',
      desc: '12 packs, 16oz bottle',
		tags: 'Beer',
		price: 19,
      unit: '12 Pack',
      type: 'drink',
      qty: 1,
		_id: 24
	},
	{
      image: "hennessy-priv750.png",
      name: 'Henessy VSOP Privilege Cognac',
      desc: '750ML bottle',
		tags: 'Liqour',
		price: 69,
      unit: '750ML',
      type: 'drink',
      qty: 1,
		_id: 25
	},
	{
      image: "patron-silver750.png",
      name: 'Patron Silver Tequila',
      desc: '750ML bottle',
		tags: 'Liqour',
		price: 59,
      unit: '750ML',
      type: 'drink',
      qty: 1,
		_id: 26
	},
	{
      image: "jameson750.png",
      name: 'Jameson Whiskey',
      desc: '750ML bottle',
		tags: 'Liqour',
		price: 59,
      unit: '750ML',
      type: 'drink',
      qty: 1,
		_id: 27
	}
]

const grillItems = [
   {
      image: "wings-raw.png",
      name: 'Garlic Black Pepper Wing',
     desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
     tags: 'Garlic Black Pepper Chicken Wing Mid Joint',
     price: 3.99,
     type: 'grill',
     qty: 1,
     _id: 50
   },
   {
      image: "tritip-raw.png",
      name: "Tri Tip Lightly Marinated",
    tags: 'Tri Tip Lightly Marinated',
    price: 7.99,
    type: 'grill',
    qty: 1,
    _id: 51
  },
  {
   image: "short-ribs-raw.png",
   name: 'Korean BBQ Short Ribs',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    tags: 'Korean BBQ Short Ribs',
    price: 4.99,
    qty: 1,
    type: 'grill',
    _id: 52
  },
//   {
//    image: "sample.png",
//    name: 'Sweet Pepper Ribs',
//     desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
//     price: 3.99,
//     type: 'grill',
//     qty: 1,
//     id: 53
//   },
  {
   image: "pork-belly-raw.png",
   name: 'Pork Belly Lightly Marinated',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    price: 4.99,
    type: 'grill',
    qty: 1,
    _id: 55
  },
//   {
//    image: "sample.png",
//    name: 'Top Round Steak',
//     desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
//     price: 5.99,
//     type: 'grill',
//     qty: 1,
//     id: 6
//   }
 ]

 const supplies = [
	{
      image: "sample.png",
      name: 'Paper Plates',
		tags: 'Paper Plate',
		price: 5.99,
      unit: '25 plates',
      type: 'supplies',
      qty: 1,
		_id: 100
	},
	{
      image: "sample.png",
      name: 'Plastic Forks',
		tags: 'Beer',
		price: 3.99,
      unit: '48 pc.',
      type: 'supplies',
		_id: 101
	}, {
      image: "sample.png",
      name: 'Playing Cards',
		tags: 'Beer',
		price: 4.99,
      unit: 'Red',
      type: 'supplies',
      qty: 1,
		_id: 102
	},
	{
      image: "sample.png",
      name: 'Playing Cards',
		tags: 'Liqour',
		price: 4.99,
      unit: 'Blue',
      type: 'supplies',
      qty: 1,
		_id: 103
	},
	{
      image: "sample.png",
      name: 'Kingsford Match Light Charcoal',
		tags: 'Charcoal',
      price: 14.99,
      type: 'supplies',
      unit: '11.6 lb',
      qty: 1,
		_id: 104
	}
]

export { foodItems, drinkItems, grillItems, supplies }