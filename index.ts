import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

type Product = {
  id: number;
  name: string;
  price: number;
};

let products: Product[] = [];
let nextId = 1;

app.post("/products", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name || price === undefined) {
    return res.status(400).send("Bad request");
  }

  const product: Product = { id: nextId++, name, price };
  products.push(product);
  res.status(201).json(product);
});

app.get("/products", (_req, res) => {
  res.json(products);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).send("Product not found");

  const name = req.body.name;
  const price = req.body.price;

  if (name) product.name = name;
  if (price !== undefined) product.price = price;

  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).send("Product not found");

  const deleted = products.splice(index, 1)[0];
  res.json(deleted);
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
