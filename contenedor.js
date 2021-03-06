const fs = require("fs");

module.exports = class Contenedor {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(this.nameFile, "utf-8");
    if(response === "") {
			return this.assign(true);
    } else {
      return JSON.parse(response);
    }
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
		}
		return data.find(element => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		data.push(product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return {
			product: product,
		};
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
		}
		product.id = id;
		const previousProduct = data.splice(id - 1, 1, product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return {
			previous: previousProduct,
			new: product,
		};
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct,
			}
		}
	}

  // Agrega id a los productos del archivo "productos.json" si sufre alguna modificacion
  assign(empty = false) {
		if(empty) {
			let id = 1;
			listaProductos.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(listaProductos));
			return listaProductos;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
		}
	}
}

const listaProductos = [
	{	id:1,
		nombre: "Metralleta vz 58",
		precio: 1500,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/sa-vz-58-sporter-rifle-kal.223-rem-1978.thumb_579x579.jpg.webp?814293"
	},
	{	id:2,
		nombre: "Metralleta mp-40",
		precio: 358,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/malorazka-gsg-mp-40-standard-kal.22-lr-4387.thumb_579x579.png.webp?814470"
	},
	{	id:3,
		nombre: "Pistola 9mm",
		precio: 250,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/pistol-grand-power-k22-mk121-kal.-22-lr-3275.thumb_579x579.jpg.webp?814375"
	},
	{	id:4,
		nombre: "Pistola 45",
		precio: 400,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/replika-pistol-automaticka-usa-1911-5048.thumb_579x579.jpg.webp?814526"
	},
	{	id:5,
		nombre: "Pistola Luger",
		precio: 550,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/replika-pistol-luger-p-08-nemecko-1898-6961.thumb_579x579.jpg.webp?814651"
	},
	{	id:6,
		nombre: "Ballesta de Caza",
		precio: 290,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/kusa-reflexna-barnett-blackcat-165-lbs-cierna-7187.thumb_579x579.jpg.webp?814668"
	},
	{	id:7,
		nombre: "Rifle de cerrojo",
		precio: 680,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/malorazka-norinco-jw25-kal.22lr-670.thumb_579x579.jpg.webp?814205"
	},
	{	id:8,
		nombre: "Machete K710",
		precio: 35,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/maceta-sck-cw-k710-5211.thumb_579x579.jpg.webp?814545"
	},
	{	id:9,
		nombre: "Hacha Tomahawk",
		precio: 45,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/sekera-tomahawk-walther-2037.thumb_579x579.jpg.webp?814297"
	},
	{	id:10,
		nombre: "Lentes de caza Balisticos",
		precio: 34,
		imagen: "https://www.afg-defense.eu/sub/afg.sk/shop/product/resized/balisticke-okuliare-bronzove-maxim-13226-4668.thumb_579x579.jpg.webp?814495"
	}
];