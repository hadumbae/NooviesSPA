/**
 * @file Badge indicating a movie is recommended.
 * @filename IsRecommendedBadge.tsx
 */

import {Badge} from "@/common/components/ui/badge.tsx";

/**
 * Displays a highlighted recommendation badge.
 */
const IsRecommendedBadge = () => {
    return (
        <Badge className="bg-yellow-500 dark:bg-yellow-500">
            Recommended
        </Badge>
    );
};

export default IsRecommendedBadge;