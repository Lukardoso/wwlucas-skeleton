import profile from "@/routes/profile";
import { Link, usePage } from "@inertiajs/react";
import { SVGAttributes } from "react";
import AvatarFallback from "./avatarfallback";

type User = {
    name: string,
    avatar?: string,
}

export default function ProfileMenu() {
    const user = usePage<{ auth: { user: User } }>().props.auth.user;
    const splittedName = user.name.split(' ');
    const username = splittedName.length > 1 ? `${splittedName[0]} ${splittedName.at(-1)}` : user.name;

    return (
        <Link href={profile.edit().url} className="grid place-items-center">
            {user.avatar
                ? <img className="h-10 w-10 overflow-hidden rounded-full" src={user.avatar} alt={user.name} />
                : <AvatarFallback className="h-10 w-10 fill-white" />
            }

            <p className="capitalize text-xs">{username}</p>
        </Link>
    );
}