import { CreateProductSchema } from "@/features/products/products.dto";
import { productsService } from "@/features/products/products.service";
import { created, handleRouteError, paginated } from "@/lib/api/response";
import { PaginationSchema } from "@/lib/api/validation";
import { requireRoles } from "@/lib/rbac/guards";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, pageSize } = PaginationSchema.parse(
      Object.fromEntries(searchParams),
    );
    const { items, total } = await productsService.getAllProducts({
      page,
      pageSize,
    });
    return paginated(items, page, pageSize, total);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireRoles("vendor", "admin");
    const body = await request.json();
    const data = CreateProductSchema.parse(body);
    const product = await productsService.createProduct(data);
    return created(product);
  } catch (error) {
    return handleRouteError(error);
  }
}
