import { UpdateProductSchema } from "@/features/products/products.dto";
import { productsService } from "@/features/products/products.service";
import { NotFoundError } from "@/lib/api/errors";
import { handleRouteError, noContent, ok } from "@/lib/api/response";
import { ObjectIdSchema } from "@/lib/api/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const productId = ObjectIdSchema.parse(id);
    const product = await productsService.getProductById(productId);
    if (!product) throw new NotFoundError("Product not found");
    return ok(product);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const productId = ObjectIdSchema.parse(id);
    const body = await request.json();
    const data = UpdateProductSchema.parse(body);
    const updated = await productsService.updateProduct(productId, data);
    if (!updated) throw new NotFoundError("Product not found");
    return ok(updated);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const productId = ObjectIdSchema.parse(id);
    await productsService.deleteProductById(productId);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
