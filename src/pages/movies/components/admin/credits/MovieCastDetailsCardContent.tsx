import {FC} from 'react';
import {CardContent} from "@/common/components/ui/card.tsx";
import {Badge} from "@/common/components/ui/badge.tsx";

interface ContentProps {
    notes?: string;
    flags: {
        cameo?: boolean,
        voiceOnly?: boolean,
        motionCapture?: boolean,
        uncredited?: boolean,
    }
}

const MovieCastDetailsCardContent: FC<ContentProps> = ({notes, flags}) => {
    const {cameo, voiceOnly, motionCapture, uncredited} = flags;
    const creditFlags = {
        "Cameo": cameo,
        "Voice Only": voiceOnly,
        "Motion Capture": motionCapture,
        "Uncredited": uncredited,
    };

    const activeFlags = Object.entries(creditFlags).filter(([_, value]) => value).map(([key]) => key);
    const hasAnyFlag = activeFlags.length > 0;

    if (notes || hasAnyFlag) {
        return (
            <CardContent>
                {
                    hasAnyFlag && <section className="grid grid-cols-4">
                        <h1 className="sr-only">Character Flags</h1>
                        {activeFlags.map((flag) => <Badge key={flag}>{flag}</Badge>)}
                    </section>
                }

                {
                    notes && <section>
                        <h1 className="sr-only">Notes</h1>
                        <p className="text-justify">{notes}</p>
                    </section>
                }
            </CardContent>
        );
    }

    return (<></>);
};

export default MovieCastDetailsCardContent;
