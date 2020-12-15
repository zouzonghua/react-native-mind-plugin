#import "TestLength.h"

@implementation TestLength

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(processString:(NSString *)input andFont:(UIFont *)font maxSize:(CGSize)maxSize callback:(RCTResponseSenderBlock)callback)
{
  NSDictionary *attrs = @{NSFontAttributeName : font};
  CGSize labelSize = [input boundingRectWithSize:maxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:attrs context:nil].size;
  NSString *w=[NSString stringWithFormat:@"%f",labelSize.width];
  NSString *h=[NSString stringWithFormat:@"%f",labelSize.height];
  callback(@[[NSNull null], w, h]);
}

@end
