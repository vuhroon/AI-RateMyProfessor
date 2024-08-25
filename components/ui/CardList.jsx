import React from "react";
import "../css/cardList.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CardList = ({ data }) => {
  return (
    <div className="cardListContainer flex flex-wrap m-auto">
      {data.map((item, index) => (
        <div key={index}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{`Card ${index + 1}`}</CardTitle>
              <CardDescription>
                {/* {`Manufacturer: ${index + 1}`}
                  {item.front} */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}-1`}>
                  <AccordionTrigger>Make</AccordionTrigger>
                  <AccordionContent>{item.front}</AccordionContent>
                </AccordionItem>
                <AccordionItem value={`item-${index}-2`}>
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>{item.back}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button>Flip</Button> */}
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CardList;
