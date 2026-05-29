const {
  sequelize,
  Region,
  Warehouse,
  Category,
  Unit,
  Product,
} = require("./models");

async function seedDatabase() {
  try {
    console.log("Bazaga ulanish va tozalash boshlandi...");
    await sequelize.sync({ force: true });
    console.log("Jadvallar tozalandi va qayta yaratildi!");

    // 12 ta viloyat
    const regionsList = [
      { name: "Andijon viloyati" },
      { name: "Buxoro viloyati" },
      { name: "Fargʻona viloyati" },
      { name: "Jizzax viloyati" },
      { name: "Xorazm viloyati" },
      { name: "Namangan viloyati" },
      { name: "Navoiy viloyati" },
      { name: "Qashqadaryo viloyati" },
      { name: "Samarqand viloyati" },
      { name: "Sirdaryo viloyati" },
      { name: "Surxondaryo viloyati" },
      { name: "Toshkent viloyati" },
    ];
    const regions = await Region.bulkCreate(regionsList);

    const categories = await Category.bulkCreate([
      { name: "Elektronika" },
      { name: "Kiyim-kechak" },
      { name: "Oziq-ovqat" },
      { name: "Maishiy texnika" },
      { name: "Qurilish mollari" },
    ]);

    const units = await Unit.bulkCreate([
      { name: "dona" },
      { name: "kg" },
      { name: "litr" },
      { name: "metr" },
      { name: "quti" },
    ]);

    let warehouses = [];
    for (let r of regions) {
      // Toshkent uchun ko'proq sklad
      let warehouseCount = r.name.includes("Toshkent") ? 6 : 3;

      for (let i = 1; i <= warehouseCount; i++) {
        warehouses.push({
          name: `${r.name.replace(" viloyati", "")} - ${i}-Sklad`,
          regionId: r.id,
        });
      }
    }
    const createdWarehouses = await Warehouse.bulkCreate(warehouses);
    console.log(
      `Viloyatlar, Kategoriyalar va jami ${createdWarehouses.length} ta Skladlar yaratildi!`,
    );

    // UI da rasmlarni va search ni test qilish uchun har bir omborga tovar qo'shamiz
    const totalPerWarehouse = 20;

    // Haqiqiy mahsulot nomlari kolleksiyasi
    const realProducts = {
      Elektronika: [
        { name: "iPhone 15 Pro Max", brand: "Apple", sku: "APP-15-PM" },
        { name: "Galaxy S24 Ultra", brand: "Samsung", sku: "SAM-S24-U" },
        { name: "MacBook Pro M3", brand: "Apple", sku: "MAC-M3-PR" },
        { name: "AirPods Pro 2", brand: "Apple", sku: "AIR-PRO-2" },
        { name: "PlayStation 5", brand: "Sony", sku: "PS5-CON" },
      ],
      "Kiyim-kechak": [
        { name: "Paxta Futbolka", brand: "Nike", sku: "NK-TSH-01" },
        { name: "Yozgi Qora Shortik", brand: "Adidas", sku: "AD-SH-02" },
        { name: "Kuzgi Kurtka", brand: "Puma", sku: "PM-JK-03" },
        { name: "Erkaklar Jinsi Shimi", brand: "Levi's", sku: "LV-JN-04" },
        { name: "Sport Krossovkasi", brand: "Reebok", sku: "RB-KR-05" },
      ],
      "Oziq-ovqat": [
        { name: "Olma Sharbat 1L", brand: "Sokko", sku: "SK-AP-1L" },
        { name: "Shokoladli Pletka", brand: "Milka", sku: "ML-CH-100" },
        { name: "Gazli Suv 1.5L", brand: "Coca-Cola", sku: "CC-WT-15" },
        { name: "Sariyog' 82%", brand: "President", sku: "PR-BT-200" },
        { name: "Qahva Donalari", brand: "Nescafe", sku: "NS-CF-500" },
      ],
      "Maishiy texnika": [
        { name: "Konditsioner 12", brand: "Artel", sku: "AR-AC-12" },
        { name: "Kir yuvish mashinasi", brand: "LG", sku: "LG-WM-8KG" },
        { name: "Muzlatgich NoFrost", brand: "Samsung", sku: "SAM-FR-NF" },
        { name: "Changyutgich", brand: "Philips", sku: "PH-VC-2000" },
        { name: "Mikroto'lqinli pech", brand: "Panasonic", sku: "PN-MW-20" },
      ],
      "Qurilish mollari": [
        { name: "Sement M400", brand: "Qizilqum", sku: "QZ-CM-400" },
        { name: "Gipsokarton list", brand: "Knauf", sku: "KN-GK-12" },
        { name: "Oq Emal Bo'yoq", brand: "Dulux", sku: "DL-PT-WT" },
        { name: "Laminat 8mm", brand: "Tarkett", sku: "TK-LM-8" },
        { name: "Kafel Yelim", brand: "Ceresit", sku: "CR-GL-11" },
      ],
    };

    for (let w of createdWarehouses) {
      let productsChunk = [];
      for (let j = 0; j < totalPerWarehouse; j++) {
        // Kategoriya aniqlash
        const category = categories[j % categories.length];
        // Shu kategoriyaga mos haqiqiy nomlarni olish
        const categoryProducts =
          realProducts[category.name] || realProducts["Elektronika"];
        // Random mahsulot tanlash
        const randomProduct =
          categoryProducts[Math.floor(Math.random() * categoryProducts.length)];

        const imageUrl = `https://picsum.photos/seed/sklad_${w.id}_${j}/400/400`;

        productsChunk.push({
          name: randomProduct.name,
          brand: randomProduct.brand,
          sku: `${randomProduct.sku}-${w.id}-${j}`,
          height: Math.floor(Math.random() * 100) + 10,
          width: Math.floor(Math.random() * 100) + 10,
          length: Math.floor(Math.random() * 100) + 10,
          year: 2024 + Math.floor(Math.random() * 5),
          stock: Math.floor(Math.random() * 100) + 10,
          categoryId: category.id,
          unitId: units[Math.floor(Math.random() * units.length)].id,
          warehouseId: w.id,
          image: imageUrl,
        });
      }
      await Product.bulkCreate(productsChunk, { logging: false });
    }

    console.log(
      "\nJami 360 ta mahsulot chiroyli rasmlari bilan saqlandi! UI uchun testga tayyor!",
    );
    process.exit(0);
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    process.exit(1);
  }
}

seedDatabase();
