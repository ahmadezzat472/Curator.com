import { CreateCategorySchema } from "@/features/categories/categories.dto";
import { categoriesService } from "@/features/categories/categories.service";
import { created, handleRouteError, ok } from "@/lib/api/response";
import { requireRoles } from "@/lib/rbac/guards";

export async function GET() {
  try {
    const categories = await categoriesService.getAllCategories();
    return ok(categories);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireRoles("admin");
    const body = await request.json();
    const data = CreateCategorySchema.parse(body);
    const category = await categoriesService.createCategory(data);
    return created(category);
  } catch (error) {
    return handleRouteError(error);
  }
}
