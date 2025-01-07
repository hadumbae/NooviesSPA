import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PersonListCard from "@/pages/persons/components/PersonListCard.tsx";

interface Props {
    persons: Person[];
    onPersonDelete: () => void;
}

const PersonCardList: FC<Props> = ({persons, onPersonDelete}) => {
    if (persons.length === 0) {
        return <PageCenter>
            <span className="text-neutral-500">There are no persons.</span>
        </PageCenter>;
    }

    return (
        persons.map((person) => <PersonListCard
            key={person._id}
            person={person}
            onPersonDelete={onPersonDelete}
        />)
    );
};

export default PersonCardList;
