import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const Allpost = () => {
  return (
    <div>
      <div>
        
          <h3 className="font-bold text-xl">Top posts</h3>
          <div className=" my-6 w-full">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="bg-blue text-white border-black border-2 ">
              <TabsTrigger className="text-gray-400" value="questions">Questions</TabsTrigger>
              <TabsTrigger className="text-gray-400" value="answers">Answers</TabsTrigger>
              <TabsTrigger className="text-gray-400" value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="questions">
              <div className="border-black border-2 w-full mr-5 rounded">
                <Table>
                  <TableCaption>List of questions.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Likes</TableHead>
                      <TableHead className="text-center">Question</TableHead>
                      <TableHead className="text-right">Asked at</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{}</TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="answers">
              <div className="border-black border-2 w-full mr-5 rounded">
                <Table>
                  <TableCaption>List of answers.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Likes</TableHead>
                      <TableHead className="text-center">Answer</TableHead>
                      <TableHead className="text-right">Replied at</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{}</TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="border-black border-2 w-full mr-5 rounded">
                <Table>
                  <TableCaption>List of all activities.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Likes</TableHead>
                      <TableHead className="text-center">Post</TableHead>
                      <TableHead className="text-right">Posted at</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium"></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export const Newpost = () => {
  return (
    <div>
        <h3 className="font-bold text-xl">New posts</h3>
        <div className="border-black border-2 w-full rounded mt-5 mr-5">
        
          <Table>
            <TableCaption>List of newest post.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Likes</TableHead>
                <TableHead className="text-center">Post</TableHead>
                <TableHead className="text-right">Posted at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </div>
     
    </div>
  );
};
