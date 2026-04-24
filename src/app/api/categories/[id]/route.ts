import { UpdateCategorySchema } from "@/features/categories/categories.dto";
import { categoriesService } from "@/features/categories/categories.service";
import { NotFoundError } from "@/lib/api/errors";
import { handleRouteError, noContent, ok } from "@/lib/api/response";
import { ObjectIdSchema } from "@/lib/api/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const categoryId = ObjectIdSchema.parse(id);
    const category = await categoriesService.getCategoryById(categoryId);
    if (!category) throw new NotFoundError("Category not found");
    return ok(category);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const categoryId = ObjectIdSchema.parse(id);
    const body = await request.json();
    const data = UpdateCategorySchema.parse(body);
    const updated = await categoriesService.updateCategory(categoryId, data);
    if (!updated) throw new NotFoundError("Category not found");
    return ok(updated);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const categoryId = ObjectIdSchema.parse(id);
    await categoriesService.deleteCategoryById(categoryId);
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
