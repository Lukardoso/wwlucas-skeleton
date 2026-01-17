import profile from "@/routes/profile";
import { Link, usePage } from "@inertiajs/react";
import AvatarFallback from "./avatarfallback";
import Arrow from "./arrow";
import AvatarController from "@/actions/App/Http/Controllers/AvatarController";
import { User } from "@/types";

export default function ProfileMenu({ inline = false }: { inline?: boolean }) {
    const user = usePage<{ auth: { user: User } }>().props.auth.user;
    const splittedName = user.name.split(' ');
    const username = splittedName.length > 1 ? `${splittedName[0]} ${splittedName.at(-1)}` : user.name;

    return (
        <Link href={profile.edit().url} className={`${inline ? 'flex justify-between items-center gap-2 pr-4 hover:opacity-70' : 'grid place-items-center'}`}>
            {user.avatar
                ? <img className="h-10 w-10 overflow-hidden rounded-full" src={AvatarController.show(user.id).url} alt={user.name} />
                : <AvatarFallback className="h-10 w-10 fill-white" />
            }

            <p className="capitalize text-xs lg:text-base flex-1">{username}</p>

            {inline && <Arrow />}
        </Link>
    );
}