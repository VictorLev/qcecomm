import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import { CategoryClient } from "./components/client"
import { CategoryColumn } from "./components/columns";



const CategoriesPage = async ( {
    params 
} : {
    params: { storeId: string}
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.nameEn,
        billboardLabel: item.billboard.label,
        createAt: format(item.createdAt, "MMMM do, yyy")
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 spaxe-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    )
}

export default CategoriesPage